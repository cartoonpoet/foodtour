import express from 'express';
import userRouter from './routers/userRouter';
import con from './mysql';

const app = express();

con.connect(function(err) {
    if (err) throw err;
    console.log('Connected');
});


app.listen(3000, () => console.log("Listening on port 3000..."));
app.use('/api', userRouter);

export default app;