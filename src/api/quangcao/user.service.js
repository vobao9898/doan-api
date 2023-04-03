const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into quang_cao( hinh_anh, trang_thai, date_create) values (?,?,?)`, [data.hinh_anh,  data.trang_thai, data.date_create],
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
        pool.query(`select * from quang_cao where id = ?`, [id], (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results[0]);
        });
    },
    getQuangCao: (callBack) => {
        pool.query(`select * from quang_cao where trang_thai = 1`, [], (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        });
    },
    page: (data, callBack) => {
        pool.query(
            `select * from quang_cao  limit ? offset ?`, [data.limit, data.offset],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateQuangCao: (data, callBack) => {
        pool.query(
            `update quang_cao set hinh_anh=?, date_update=?, trang_thai=? where id = ?`, [
                data.hinh_anh, data.date_update, data.trang_thai, data.id
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
        pool.query(`DELETE FROM quang_cao WHERE id = ?`, [data.id], (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results[0]);
        });
    },
};