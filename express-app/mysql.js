
const mysql = require('mysql2/promise')
const pool = mysql.createPool({
    host: 'railro-tour-rds.cxjrhe2kspyk.ap-northeast-2.rds.amazonaws.com',
    user: 'admin',
    password: 'ssdd4670',
    database: 'foodtour',
    connectionLimit: 50,
});


export default pool;