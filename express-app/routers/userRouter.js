import express from 'express';
import pool from '../mysql';
import axios from 'axios';
import Jwt from 'jsonwebtoken';
import multer from 'multer';
import fs from "fs";

const userRouter = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //파일이 이미지 파일이면
        const { contentid, contenttypeid } = req.body;
        if (file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" || file.mimetype == "image/png") {
            console.log("이미지 파일이네요")
            const path = "image/profile/" + req.params.user_id;
            fs.mkdirSync(path, { recursive: true });
            cb(null, path);
        }
    },
    //파일이름 설정
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

var upload = multer({ storage: storage });

userRouter.get('/user/:user_id', async function (req, res) {
    const conn = await pool.getConnection(async conn => conn);
    try {
        console.log("GET: 유저 정보 조회");
        const getUser_sql = `SELECT * FROM foodtour.user WHERE foodtour.user.id = ?`;
        const userInfo = await conn.query(getUser_sql, [req.params.user_id]);
        conn.release();
        res.json(userInfo[0][0]);
    } catch (err) {
        console.log(err.message);
        conn.release();
        res.status(400).json({ message: '유효하지 않은 User_id입니다.' });
    }
})

userRouter.patch('/user/:user_id', upload.single("file"), async function (req, res) {
    const conn = await pool.getConnection(async conn => conn);
    try {
        console.log("PATCH: 유저 정보 수정");

        const updateUser_sql = `
        UPDATE  foodtour.user
        SET name = ?, nickname = ?, profile_img = IFNULL(?, profile_img)
        WHERE id = ?
        ;
        `
        const updateQuery = await conn.query(updateUser_sql, [req.body.name, req.body.nickname, req.file ? req.file.path : null, req.params.user_id]);
        conn.release();
        res.json({ message: "프로필 수정 완료" });
    } catch (err) {
        console.log(err.message);
        conn.release();
        res.status(400).json({ message: '유효하지 않은 User_id입니다.' });
    }
})

userRouter.delete('/user/:user_id', async function (req, res) {
    const conn = await pool.getConnection(async conn => conn);
    try {
        console.log("delete: 유저 정보 삭제");
        console.log(req.params);
        const deleteUser_sql = `
        DELETE FROM foodtour.user WHERE foodtour.user.id = ?;
        `
        const deleteQuery = await conn.query(deleteUser_sql, [req.params.user_id]);
        console.log(deleteQuery);
        conn.release();
        res.json({ message: "회원 탈퇴 완료" });
    } catch (err) {
        console.log(err.message);
        conn.release();
        res.status(400).json({ message: '유효하지 않은 User_id입니다.' });
    }
})

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
            data: { user_id: user[0].insertId, social_user_id: kakaoData.id, email: kakaoData.kakao_account.email }
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