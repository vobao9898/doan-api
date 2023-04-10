
const { createPool } = require('mysql');

// const pool = createPool({
//     host: 'us-cdbr-east-05.cleardb.net',
//     user: 'bc64f62de970d8',
//     password: 'e92eda4e',
//     database: 'heroku_5ec5c13a06479b3',
//     connectionLimit: 10,
// });


const pool = createPool({
    connectionLimit: 11,
    host: 'us-cdbr-east-04.cleardb.com',
    user: 'bf0844fbd86225',
    password: '71b99177238a174',
    database: 'heroku_b938c71e4878655',
});

module.exports = pool;