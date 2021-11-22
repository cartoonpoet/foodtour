import express from 'express';
import pool from '../mysql';
// import con from '../mysql';
import axios from 'axios';

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


userRouter.post('/user/kakao', async function (req, res) {
    try {
        if (!req.body.access_token) {
            res.status(400).json({ message: 'access_token이 필요합니다.' });
        }
        const kakaoRes = await axios.get("https://kapi.kakao.com/v2/user/me", {
            headers: {
                Authorization: `Bearer ${req.body.access_token}`
            }
        })
        let kakaoData = kakaoRes.data;

        const sql = 'insert into foodtour.`user` (username, password, email, name, nickname, reg_date, last_login, is_active)'
            + 'VALUES(?, ?, ?, ?, ?, now(), now(), true)'
            + 'ON DUPLICATE KEY UPDATE last_login = now();';

        const user = await pool.query(sql, [kakaoData.kakao_account.email.split("@")[0], createCode(50), kakaoData.kakao_account.email, "Unknown", kakaoData.properties.nickname]);
        console.log(user);
        // console.log(user);
        res.send();

    } catch (err) {
        console.log(err.message);
        res.status(400).json({ message: '유효하지 않은 access_token' });
    }


})


export default userRouter;