import express from 'express';
import con from '../mysql';

const userRouter = express.Router();

userRouter.get('/user', function(req, res){
    const sql = "SELECT * FROM social_type"
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.send(result)
    });
});


export default userRouter;