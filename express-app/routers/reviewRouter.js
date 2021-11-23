import express from 'express';
import pool from '../mysql';
import multer from 'multer';
import fs from 'fs';

const reviewRouter = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //파일이 이미지 파일이면
        const { contentid, contenttypeid } = req.body;
        if (file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" || file.mimetype == "image/png") {
            console.log("이미지 파일이네요")
            console.log(contentid);
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

    console.log(req.files);
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
        await conn.commit();
        conn.release();
        res.send();
    } catch (err) {
        console.log(err.message);
        await conn.rollback();
        conn.release();
        res.status(400).json({ message: 'reqeust body를 확인해주세요.' });
    }
});


export default reviewRouter;