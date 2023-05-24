
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
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'b074eba4947c75',
    password: '04ab7806',
    database: 'heroku_3e55e5d7ff658ac',
});

module.exports = pool;