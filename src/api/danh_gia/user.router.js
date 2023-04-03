const router = require('express').Router();
const { checkToken } = require('./../../auth/token_validation');
const { create, getChiTietDanhGia} = require('./user.controller');
router.post('/', create);
router.get('/getChiTietDanhGia/:id', getChiTietDanhGia);

module.exports = router;