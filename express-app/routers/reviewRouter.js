import express from 'express';
import pool from '../mysql';

const reviewRouter = express.Router();

reviewRouter.post('/review', async function (req, res) {
    const conn = await pool.getConnection(async conn => conn);
    console.log(req.body);
    try {

        res.send();
    } catch (err) {
        console.log(err.message);
        res.status(400).json({ message: 'reqeust body를 확인해주세요.' });
    }
});


export default reviewRouter;