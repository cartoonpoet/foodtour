import express from 'express';
import pool from '../mysql';
import axios from 'axios';
import Jwt from 'jsonwebtoken';

const userRouter = express.Router();

// userRouter.get('/user/:id', function (req, res) {
//     const sql = "SELECT * FROM social_type"
//     con.query(sql, function (err, result, fields) {
//         if (err) throw err;
//         res.send(result)
//     });
// });


function createCode(iLength) {
    const objArr = "0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,~,`,!,@,#,$,%,^,&,*,(,),-,+,|,_,=,\,[,],{,},<,>,?,/,.,;".split(",");
    let arr = objArr;
    let randomStr = "";
    for (var j = 0; j < iLength; j++) {
        randomStr += arr[Math.floor(Math.random() * arr.length)];
    }
    return randomStr
}

userRouter.post('/kakao', async function (req, res) {
    if (!req.body.access_token) {
        res.status(400).json({ message: 'access_token이 필요합니다.' });
    }
    const conn = await pool.getConnection(async conn => conn);
    try {
        const kakaoRes = await axios.get("https://kapi.kakao.com/v2/user/me", {
            headers: {
                Authorization: `Bearer ${req.body.access_token}`
            }
        })
        let kakaoData = kakaoRes.data;

        await conn.beginTransaction();
        const sql = 'insert into foodtour.`user` (username, password, email, name, nickname, reg_date, last_login, is_active)'
            + 'VALUES(?, ?, ?, ?, ?, now(), now(), true)'
            + 'ON DUPLICATE KEY UPDATE last_login = now();';
        const user = await conn.query(sql, [kakaoData.kakao_account.email.split("@")[0], createCode(50), kakaoData.kakao_account.email, "Unknown", kakaoData.properties.nickname]);

        const kakao_user_insert_sql = `insert into social (user_id, social_user_id, social_type_id) 
        select ?, ?, ? from dual where not exists (select * from social where social_user_id = ?);`;
        const kakao_user = await conn.query(kakao_user_insert_sql, [user[0].insertId, kakaoData.id, 1, kakaoData.id]);
        await conn.commit();
        conn.release();
        const token = Jwt.sign({
            data: { social_user_id: kakaoData.id, email: kakaoData.kakao_account.email }
        }, 'secret', { expiresIn: '5h' });

        res.json({ id: user[0].insertId, kakao_id: kakaoData.id, message: "로그인 성공", token });
    } catch (err) {
        console.log(err.message);
        await conn.rollback();
        conn.release();
        res.status(400).json({ message: '유효하지 않은 access_token' });
    }
})


export default userRouter;