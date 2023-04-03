const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into tin_tuc(ten_tin_tuc, tom_tat, noi_dung, hinh_anh, date_create) values (?,?,?,?,?)`, [data.ten_tin_tuc, data.tom_tat, data.noi_dung, data.hinh_anh, data.date_create],
            (error, results, fields) => {
                if (error) {
                    console.log(error);
                    callBack(error);
                }

                return callBack(null, results);
            }
        );
    },
    getQuangCaoByUserId: (id, callBack) => {
        pool.query(`select * from tin_tuc where id = ?`, [id], (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results[0]);
        });
    },
    getQuangCao: (callBack) => {
        pool.query(`select * from tin_tuc`, [], (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        });
    },
   
    updateQuangCao: (data, callBack) => {
        pool.query(
            `update tin_tuc set ten_tin_tuc=?, tom_tat=?, noi_dung=?, hinh_anh=?, date_update=? where id = ?`, [
                data.ten_tin_tuc, data.tom_tat, data.noi_dung, data.hinh_anh, data.date_update, data.id
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    deleteQuangCao: (data, callBack) => {
        console.log(data);
        pool.query(`DELETE FROM tin_tuc WHERE id = ?`, [data.id], (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results[0]);
        });
    },
};