import express from 'express';
import pool from '../mysql';

const reviewCountRouter = express.Router();

reviewCountRouter.get('/review/count/:contentid', async function (req, res) {
    const conn = await pool.getConnection(async conn => conn);
    try {
        const views_select_sql = `SELECT count(*) as review_count FROM foodtour.review 
                            WHERE foodtour.review.contentid = ?`;
        const select_result_query = await conn.query(views_select_sql, [req.params.contentid]);
        res.json(select_result_query[0][0]);
    } catch (err) {
        console.log(err.message);
        res.status(400).json({ message: 'params를 확인해주세요.' });
    }
});

export default reviewCountRouter;