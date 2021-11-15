
const express = require('express');
const app = express();
const port = 3000

const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'railro-tour-rds.cxjrhe2kspyk.ap-northeast-2.rds.amazonaws.com',
    user: 'admin',
    password: 'ssdd4670',
    database: 'foodtour'
});

con.connect(function(err) {
    if (err) throw err;
    console.log('Connected');
});

app.get('/api/test', (request, response) => {
    const sql = "SELECT * FROM social_type"
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        response.send(result)
    });
});

app.listen(port, () => console.log("Listening on port 3000..."));