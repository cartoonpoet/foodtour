import express from 'express';
import userRouter from './routers/userRouter';

const app = express();


app.listen(4000, () => console.log("Listening on port 4000..."));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/cert', userRouter);

export default app;