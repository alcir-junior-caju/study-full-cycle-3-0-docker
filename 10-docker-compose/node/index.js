const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const connection = mysql.createConnection(config);
const sql = `INSERT INTO people(name) values('Caju')`;
connection.query(sql);
connection.end();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
