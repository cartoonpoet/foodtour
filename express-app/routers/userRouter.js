import express from 'express';
import app from '../app';
import con from '../mysql';

const userRouter = express.Router();

userRouter.get('/user', function (req, res) {
    const sql = "SELECT * FROM social_type"
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.send(result)
    });
});


userRouter.post('/user', function (req, res) {
    console.log(req.body)
    // if (!req.body.password) {
    //     res.status(400).send('password or name not')
    // }
    res.send();
})


export default userRouter;