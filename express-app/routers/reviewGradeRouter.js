import express from 'express';
import pool from '../mysql';

const reviewGradeRouter = express.Router();

reviewGradeRouter.get('/review/grade/:contentid', async function (req, res) {
    const conn = await pool.getConnection(async conn => conn);
    try {
        console.log("장소 평점 조회");
        const views_select_sql = `SELECT foodtour.review.contenttypeid, foodtour.review.contentid, avg(foodtour.review.grade) as grade FROM foodtour.review 
                            WHERE foodtour.review.contentid = ?`;
        const select_result_query = await conn.query(views_select_sql, [req.params.contentid]);
        conn.release();
        res.json(select_result_query[0][0]);
    } catch (err) {
        console.log(err.message);
        conn.release();
        res.status(400).json({ message: 'params를 확인해주세요.' });
    }
});

export default reviewGradeRouter;