const {
    create,
    getQuangCaoByUserId,
    getQuangCao,
    updateQuangCao,
    deleteQuangCao,
} = require('./user.service');
const { compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');

function kt(a, b) {
    if (a == b) return true;
    return false;
}
module.exports = {
    createQuanCao: (req, res) => {
        const body = req.body;

        // const salt = genSaltSync(10);
        // body.password = hashSync(body.password, salt);

        create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database connection errror',
                });
            }
            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    },


    getQuangCaoByUserId: (req, res) => {
        const id = req.params.id;
        getQuangCaoByUserId(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: 'Record not Found',
                });
            }

            return res.json({
                success: 1,
                data: results,
            });
        });
    },
    getQuangCao: (req, res) => {
        getQuangCao((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results,
            });
        });
    },
    updateQuangCao: (req, res) => {
        const body = req.body;
        updateQuangCao(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                message: 'updated successfully',
            });
        });
    },
    deleteQuangCao: (req, res) => {
        const data = req.body;

        deleteQuangCao(data, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(results);
            if (results == 'undefined') {
                return res.json({
                    success: 1,
                    message: 'user deleted successfully',
                });
            }
            return res.json({
                success: 0,
                message: 'Record Not Found',
            });
        });
    },
};