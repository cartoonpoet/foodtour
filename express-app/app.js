import express from 'express';
import userRouter from './routers/userRouter';
import reviewRouter from './routers/reviewRouter';
import viewsRouter from './routers/viewsRouter';
import reviewCountRouter from './routers/reviewCountRouter';
import reviewGradeRouter from './routers/reviewGradeRouter';
import hashtagFrequencyRouter from './routers/hashtagFrequencyRouter';

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
app.use(express.static('image'));
app.use('/api/cert', userRouter);
app.use('/api', reviewRouter);
app.use('/api', viewsRouter);
app.use('/api', reviewCountRouter);
app.use('/api', reviewGradeRouter);
app.use('/api/hashtag', hashtagFrequencyRouter);

export default app;