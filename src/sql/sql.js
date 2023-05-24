const mysql = require('mysql');

const con = mysql.createPool({
    connectionLimit: 11,
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'b074eba4947c75',
    password: '04ab7806',
    database: 'heroku_3e55e5d7ff658ac',
});

let danhsachLogin = (req, res) => {
    var sql = 'SELECT * FROM nhan_vien';
    con.query(sql, function(err, results) {
        if (err) throw err;
        else {
            // nhommonan = JSON.stringify({ monan: results });
            res.json({ nhan_vien: results });
        }
    });
};

let Login = (req, res) => {
    res.send({
        token: 'test123',
    });
};

module.exports = {
    danhsachLogin: danhsachLogin,
    Login: Login,
};