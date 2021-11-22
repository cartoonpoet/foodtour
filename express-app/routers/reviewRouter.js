import express from 'express';
import pool from '../mysql';
import multer from 'multer';

const reviewRouter = express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //파일이 이미지 파일이면
        if (file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" || file.mimetype == "image/png") {
            console.log("이미지 파일이네요")
            cb(null, 'image/review')
        }
    },
    //파일이름 설정
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

var upload = multer({ storage: storage });

reviewRouter.post('/review', upload.array("imgs", 5), async function (req, res) {
    const conn = await pool.getConnection(async conn => conn);
    console.log(req.body);
    try {
        await conn.beginTransaction();
        const review_sql = `INSERT INTO foodtour.review (user_id, contenttypeid, contentid, content, grade, write_date)
        VALUES(?, ?, ?, ?, ?, now())`;
        const review = await conn.query(review_sql, [req.body.user_id, req.body.contenttypeid, req.body.contentid, req.body.content, req.body.grade]);

        const hashtag_sql = `INSERT INTO foodtour.hashtag (review_id, tag_name) VALUES ?;`;
        let hashtag_values = [];
        for (let i = 0; i < req.body.tags.length; i++) {
            hashtag_values.push([review[0].insertId, req.body.tags[i].text]);
        }
        const hashtag = await conn.query(hashtag_sql, [hashtag_values]);


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