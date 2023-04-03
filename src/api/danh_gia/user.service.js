const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into chi_tiet_danh_gia(id_giay, id_danh_gia, date_create) values (?,?,?)`, [data.id_giay,  data.id_danh_gia, data.date_create],
            (error, results, fields) => {
                if (error) {
                    console.log(error);
                    callBack(error);
                }

                return callBack(null, results);
            }
        );
    },
    getChiTietDanhGia: (id, callBack) => {
        pool.query(`select AVG(DISTINCT d.ten_danh_gia) as danh_gia  from chi_tiet_danh_gia as ct, danh_gia as d where ct.id_danh_gia = d.id and id_giay = ?`, [id], (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        });
    },
    getChiTietDanhGia: (id, callBack) => {
        pool.query(`select AVG(DISTINCT d.ten_danh_gia) as danh_gia  from chi_tiet_danh_gia as ct, danh_gia as d where ct.id_danh_gia = d.id and id_giay = ?`, [id], (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
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