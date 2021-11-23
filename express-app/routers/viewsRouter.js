import express from 'express';
import pool from '../mysql';


const viewsRouter = express.Router();


viewsRouter.get('/views/:contentid', async function (req, res) {
    const conn = await pool.getConnection(async conn => conn);
    try {
        const views_select_sql = `SELECT * FROM foodtour.views 
                            WHERE foodtour.views.contentid = ?`;
        const select_result_query = await conn.query(views_select_sql, [req.params.contentid]);
        res.json(select_result_query[0][0]);
    } catch (err) {
        console.log(err.message);
        res.status(400).json({ message: 'params를 확인해주세요.' });
    }
});

viewsRouter.post('/views', async function (req, res) {
    const conn = await pool.getConnection(async conn => conn);
    try {
        const views_insert_sql = `INSERT INTO foodtour.views VALUES(?,?,?) ON DUPLICATE KEY UPDATE view_count=view_count+1`;
        const insert_result_query = await conn.query(views_insert_sql, [req.body.contenttypeid, req.body.contentid, 1]);

        res.json({ message: "조회수 삽입 완료" });
    } catch (err) {
        console.log(err.message);
        res.status(400).json({ message: 'request body를 확인해주세요.' });
    }
});



export default viewsRouter;