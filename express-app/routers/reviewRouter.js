import express from 'express';
import pool from '../mysql';
import multer from 'multer';
import fs from 'fs';

const reviewRouter = express.Router();


reviewRouter.get('/review', async function (req, res) {
    console.log(req.query);
    const conn = await pool.getConnection(async conn => conn);
    try {
        const review_select_sql = `SELECT foodtour.review.id as review_id, 
                                        foodtour.user.id as user_id,
                                        foodtour.user.nickname, 
                                        foodtour.user.profile_img, 
                                        foodtour.review.content, 
                                        foodtour.review.grade, 
                                        foodtour.review.write_date,
                                        GROUP_CONCAT(distinct IFNULL(foodtour.hashtag.tag_name, '') SEPARATOR '<') as tags,
                                        GROUP_CONCAT(distinct IFNULL(foodtour.review_img.img_path, '') SEPARATOR '<') as imgs_path
                                from foodtour.user left join foodtour.review on foodtour.user.id = foodtour.review.user_id 
                                left join foodtour.hashtag on foodtour.review.id = foodtour.hashtag.review_id 
                                left join foodtour.review_img on foodtour.review.id = foodtour.review_img.review_id 
                                where foodtour.review.contenttypeid = ? and foodtour.review.contentid = ?
                                GROUP BY foodtour.review.id
                                order by foodtour.review.write_date desc, foodtour.review.id desc;
`;
        const reviewData = await conn.query(review_select_sql, [req.query.contenttypeid, req.query.contentid]);
        res.json(reviewData[0]);
    } catch (err) {
        console.log(err.message);
        res.status(400).json({ message: 'query parameter를 확인해주세요.' });
    }
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //파일이 이미지 파일이면
        const { contentid, contenttypeid } = req.body;
        if (file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" || file.mimetype == "image/png") {
            // console.log("이미지 파일이네요")
            const path = "image/review/" + contenttypeid + "/" + contentid;
            fs.mkdirSync(path, { recursive: true });
            cb(null, path);
        }
    },
    //파일이름 설정
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

var upload = multer({ storage: storage });

reviewRouter.post('/review', upload.array("imgs[]", 5), async function (req, res) {
    const conn = await pool.getConnection(async conn => conn);

    // console.log(req.files);
    try {
        await conn.beginTransaction();

        //리뷰 insert
        const review_sql = `INSERT INTO foodtour.review (user_id, contenttypeid, contentid, content, grade, write_date)
        VALUES(?, ?, ?, ?, ?, now())`;
        const review = await conn.query(review_sql, [req.body.user_id, req.body.contenttypeid, req.body.contentid, req.body.content, req.body.grade]);

        //태그 insert
        const hashtag_sql = `INSERT INTO foodtour.hashtag (review_id, tag_name) VALUES ?;`;
        let hashtag_values = [];
        let tags = JSON.parse(req.body.tags);
        for (let i = 0; i < tags.length; i++) {
            hashtag_values.push([review[0].insertId, tags[i].text]);
        }
        if (hashtag_values.length > 0) {
            const hashtag = await conn.query(hashtag_sql, [hashtag_values]);
        }

        //리뷰 이미지 경로 insert
        const file_sql = `INSERT INTO foodtour.review_img (review_id, img_path) VALUES ?;`;
        let img_values = [];
        for (let i = 0; i < req.files.length; i++) {
            img_values.push([review[0].insertId, req.files[i].path]);
        }
        if (img_values.length > 0) {
            const review_imgs = await conn.query(file_sql, [img_values]);
        }

        //INSERT한 리뷰 SELECT해서 return
        const review_select_sql = `SELECT foodtour.review.id as review_id, 
		                                foodtour.user.nickname, 
		                                foodtour.user.profile_img, 
                                        foodtour.review.content, 
                                        foodtour.review.grade, 
                                        foodtour.review.write_date,
                                        GROUP_CONCAT(distinct IFNULL(foodtour.hashtag.tag_name, '') SEPARATOR '<') as tags,
                                        GROUP_CONCAT(distinct IFNULL(foodtour.review_img.img_path, '') SEPARATOR '<') as imgs_path,
                                        foodtour.review.user_id
                                    from foodtour.review left join foodtour.user on foodtour.review.user_id = foodtour.user.id
                                    left join foodtour.hashtag on foodtour.review.id = foodtour.hashtag.review_id 
                                    left join foodtour.review_img on foodtour.review.id = foodtour.review_img.review_id 
                                    where foodtour.review.id = ?;`;
        const reviewData = await conn.query(review_select_sql, [review[0].insertId]);
        await conn.commit();
        conn.release();

        res.json(reviewData[0][0]);
    } catch (err) {
        console.log(err.message);
        await conn.rollback();
        conn.release();
        res.status(400).json({ message: 'reqeust body를 확인해주세요.' });
    }
});


export default reviewRouter;