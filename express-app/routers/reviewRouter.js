import express from 'express';
import pool from '../mysql';
import Jwt from 'jsonwebtoken';

const reviewRouter = express.Router();

reviewRouter.post('/review', async function (req, res) {
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