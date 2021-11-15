import mysql from 'mysql';

const con = mysql.createConnection({
    host: 'railro-tour-rds.cxjrhe2kspyk.ap-northeast-2.rds.amazonaws.com',
    user: 'admin',
    password: 'ssdd4670',
    database: 'foodtour'
});



export default con;