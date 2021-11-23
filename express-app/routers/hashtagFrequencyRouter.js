import express from 'express';
import pool from '../mysql';

const hashtagFrequencyRouter = express.Router();

hashtagFrequencyRouter.get('/frequency/:contentid', async function (req, res) {
    const conn = await pool.getConnection(async conn => conn);
    try {
        console.log("태그 빈도 수 조회");
        const tag_select_sql = `select count(foodtour.hashtag.tag_name) as value, foodtour.hashtag.tag_name as text
                                    from foodtour.review left join foodtour.hashtag on foodtour.review.id = foodtour.hashtag.review_id 
                                    where foodtour.review.contentid = ?
                                    group by foodtour.hashtag.tag_name
                                    order by value desc, text asc;`;
        const select_result_query = await conn.query(tag_select_sql, [req.params.contentid]);
        console.log(select_result_query[0]);
        conn.release();
        res.json(select_result_query[0]);
    } catch (err) {
        console.log(err.message);
        conn.release();
        res.status(400).json({ message: 'params를 확인해주세요.' });
    }
});

export default hashtagFrequencyRouter;