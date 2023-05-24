const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        console.log(data)
        pool.query(
            `insert into chi_tiet_danh_gia(id_giay, id_khach_hang, date_create, noi_dung, rating) values (?,?,?,?,?)`, [data.id_giay,  data.id_khach_hang, data.date_create, data.noi_dung, data.rating],
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
        pool.query(`SELECT c.* , CONCAT_WS(' ',k.ho_khach_hang, k.ten_khach_hang) as ten_khach_hang from giay as g, chi_tiet_danh_gia as c, khach_hang as k WHERE g.id = c.id_giay and c.id_khach_hang = k.id and g.id = ?`, [id], (error, results, fields) => {
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