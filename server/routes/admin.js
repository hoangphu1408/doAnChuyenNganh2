const router = require("express").Router();

const authAdmin /*{ registrationAccount, verifyEmailToken, taoTaiKhoan }*/ = require("../utils/Auth");
const getData /*{ getTaiKhoanCuDan, getResident, getAccountAdmin }*/ = require("../utils/GetData");
const postData /*{ themCuDan, themTaiKhoanCuDan }*/ = require("../utils/PostData");
const putData /*{ suaCuDan, suaTaiKhoan, thayDoiMatKhauTaiKhoan, thayDoiEmailTaiKhoan }*/ = require("../utils/PutData");
const deleteData /*{ xoaCuDan, xoaTaiKhoanCuDan, xoaTaiKhoanQuanTri }*/ = require("../utils/DeleteData");
router.get("/verify-mail/:token", async (req, res) => {
  return authAdmin.verifyEmailToken(req.params.token, res);
});

router.post("/register", async (req, res) => {
  return await authAdmin.registrationAccount(req.body.data, res);
});

router.post("/api/themCuDan", async (req, res) => {
  return postData.themCuDan(req.body.data, res);
});

router.get("/api/layDanhSachCuDan", async (req, res) => {
  return getData.getResident(res);
});

router.put("/api/suaCuDan", async (req, res) => {
  return await putData.suaCuDan(req.query.id, req.body.data, res);
});

router.delete("/api/xoaCuDan", async (req, res) => {
  return await deleteData.xoaCuDan(req.query.id, res);
});

router.get("/api/layDanhSachTaiKhoanCuDan", async (req, res) => {
  return await getData.getTaiKhoanCuDan(res);
});

router.post("/api/themTaiKhoanCuDan", async (req, res) => {
  return postData.themTaiKhoanCuDan(req.body.data, res);
});

router.delete("/api/xoaTaiKhoanCuDan", async (req, res) => {
  return deleteData.xoaTaiKhoanCuDan(req.query.id, res);
});

/*
============================================================================================
                                    Tài khoản quản trị
============================================================================================
*/

router.post("/api/taoTaiKhoanQuanTri", async (req, res) => {
  return await authAdmin.taoTaiKhoan(req.body.data, res);
});

router.get("/api/layDanhSachTaiKhoanQuanTri", async (req, res) => {
  return await getData.getAccountAdmin(res);
});

router.put("/api/suaTaiKhoanQuanTri", async (req, res) => {
  return await putData.suaTaiKhoan(req.query.id, req.body.data, res);
});

router.put("/api/thayDoiMatKhauTaiKhoan", async (req, res) => {
  return await putData.thayDoiMatKhauTaiKhoan(req.query.id, req.body.data, res);
});

router.put("/api/thayDoiEmailTaiKhoan", async (req, res) => {
  return await putData.thayDoiEmailTaiKhoan(req.query.id, req.body.data, res);
});

router.delete("/api/xoaTaiKhoanQuanTri", async (req, res) => {
  return await deleteData.xoaTaiKhoanQuanTri(req.query.id, res);
});

/*
============================================================================================
                                    Căn hộ
============================================================================================
*/

router.get("/api/layDanhSachCanHo", async (req, res) => {
  return await getData.getCanHo(res);
});

router.post("/api/themCanHo", async (req, res) => {
  return await postData.themCanHo(req.body.data, res);
});

router.put("/api/chinhSuaCanHo", async (req, res) => {
  return await putData.chinhSuaCanHo(req.query.id, req.body.data, res);
});

router.delete("/api/xoaCanHo", async (req, res) => {
  return await deleteData.xoaCanHo(req.query.id, res);
});

/*
============================================================================================
                                    Thông báo
============================================================================================
*/

router.get("/api/layDanhSachThongBao", async (req, res) => {
  return await getData.getBaiDang(res);
});

router.post("/api/dangThongBao", async (req, res) => {
  return await postData.themThongBao(req.body.data, res);
});

/*
============================================================================================
                                    Phí dịch vụ
============================================================================================
*/

router.get("/api/chi-phi", async (req, res) => {
  return await getData.getChiPhi(res);
});

router.post("/api/chi-phi", async (req, res) => {
  return await postData.themPhiDichVu(req.body.data, res);
});

router.put("/api/chi-phi", async (req, res) => {
  return await putData.chinhSuaChiPhi(req.query.id, req.body.data, res);
});

router.delete("/api/chi-phi", async (req, res) => {
  return await deleteData.xoaChiPhi(req.query.id, res);
});

/*
============================================================================================
                                    Phiếu thu nước
============================================================================================
*/

router.get("/api/phieu-thu/tienNuoc", async (req, res) => {
  return await getData.getPhieuNuoc(res);
});

router.post("/api/phieu-thu/tienNuoc", async (req, res) => {
  return await postData.themPhieuThuNuoc(req.body.data, res);
});

router.put("/api/phieu-thu/tienNuoc", async (req, res) => {
  return await putData.chinhSuaPhieuNuoc(req.query.id, req.body.data, res);
});

router.delete("/api/phieu-thu/tienNuoc", async (req, res) => {
  return await deleteData.xoaPhieuNuoc(req.query.id, res);
});

/*
============================================================================================
                                    Phiếu thu tiền xe
============================================================================================
*/

router.get("/api/phieu-thu/tienGiuXe", async (req, res) => {
  return await getData.getPhieuGiuXe(res);
});

router.post("/api/phieu-thu/tienGiuXe", async (req, res) => {
  return await postData.themPhieuThuGiuXe(req.body.data, res);
});

router.put("/api/phieu-thu/tienGiuXe", async (req, res) => {
  return await putData.chinhSuaPhieuGiuXe(req.query.id, req.body.data, res);
});

router.delete("/api/phieu-thu/tienGiuXe", async (req, res) => {
  return await deleteData.xoaPhieuGiuXe(req.query.id, res);
});

/*
============================================================================================
                                    Phiếu thu quản lý
============================================================================================
*/

router.get("/api/phieu-thu/tienQuanLy", async (req, res) => {
  return await getData.getPhieuQL(res);
});

router.post("/api/phieu-thu/tienQuanLy", async (req, res) => {
  return await postData.themPhieuQuanLy(req.body.data, res);
});

router.delete("/api/phieu-thu/tienQuanLy", async (req, res) => {
  return await deleteData.xoaPhieuQL(req.query.id, res);
});

/*
============================================================================================
                                    Check thanh toán
============================================================================================
*/

router.put("/api/phieu-thu/checkThanhToan", async (req, res) => {
  return await putData.updateThanhToan(req.query.id, req.body.data, res);
});

/*
============================================================================================
                                    Thống kê tiền xe theo tuần
============================================================================================
*/

router.get("/api/thong-ke/tienXeTheoTuan", async (req, res) => {
  return await getData.getTienXeTheoTuan(req.query.week, res);
});

router.get("/api/thong-ke/tienXeTheoThang", async (req, res) => {
  return await getData.getTienXeTheoThang(req.query.month, res);
});

router.get("/api/thong-ke/tienXeTheoNam", async (req, res) => {
  return await getData.getTienXeTheoNam(req.query.year, res);
});

module.exports = router;
