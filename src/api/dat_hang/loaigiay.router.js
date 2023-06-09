const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
import * as controller from "./loaiGiay.controller";
router.get("/", controller.getAll);
router.post("/", controller.create);
router.get('/getHuyDatHangById/:id', controller.getHuyDatHangById);
router.post("/update", controller.update);
router.post("/delete", controller.delete);
router.post("/page", controller.page);
router.get("/getTinhThanh", controller.getTinhThanh);
router.post("/pageSearch", controller.pageSearch);
router.post("/get", controller.pageSearch);
router.post("/getChiTietDonHangByID", controller.getCTDonHangByID);
router.post("/getDonHangByID", controller.getDonHangByID);
router.post("/getGiayByID", controller.getGiayByID);
router.post("/getDonHangByEmail", controller.getDonHangByEmail);
router.post("/getDonHangBySDT", controller.getDonHangBySDT);
router.post("/getDonHangByEmailAll", controller.getDonHangByEmailAll);
router.post("/getDonHangBySDTAll", controller.getDonHangBySDTAll);
router.post("/updateStatus", controller.updateStatus);
router.post("/updateThanhToan", controller.updateThanhToan);
router.post("/huyDonHang", controller.huyDonHang);
router.post("/pageSearchByID", controller.pageSearchByID);
router.post('/getDonHangByMessenger_id', controller.getDonHangByMessenger_id);
router.post('/getCTDonHangByID', controller.getCTDonHangByID);
module.exports = router;