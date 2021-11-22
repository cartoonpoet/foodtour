import express from 'express';
import userRouter from './routers/userRouter';
import reviewRouter from './routers/reviewRouter';


const app = express();
const cors = require('cors');
let corsOption = {
    origin: 'http://localhost:3000', // 허락하는 요청 주소
    credentials: true // true로 하면 설정한 내용을 response 헤더에 추가 해줍니다.
};

app.listen(4000, () => console.log("Listening on port 4000..."));
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/cert', userRouter);
app.use('/api', reviewRouter);

export default app;