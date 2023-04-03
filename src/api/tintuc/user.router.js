const router = require('express').Router();
const { checkToken } = require('./../../auth/token_validation');
const { createQuanCao, getQuangCaoByUserId, getQuangCao, updateQuangCao, deleteQuangCao } = require('./user.controller');
router.get('/', getQuangCao);
router.post('/', createQuanCao);
router.get('/:id', getQuangCaoByUserId);
router.patch('/', updateQuangCao);
router.post('/delete', deleteQuangCao);

module.exports = router;