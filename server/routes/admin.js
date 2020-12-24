
const router = require('express').Router();

const authAdmin /*{ registrationAccount, verifyEmailToken, taoTaiKhoan }*/ =  require("../utils/Auth");
const getData/*{ getTaiKhoanCuDan, getResident, getAccountAdmin }*/ = require("../utils/GetData");
const postData/*{ themCuDan, themTaiKhoanCuDan }*/ = require('../utils/PostData');
const putData /*{ suaCuDan, suaTaiKhoan, thayDoiMatKhauTaiKhoan, thayDoiEmailTaiKhoan }*/ = require('../utils/PutData');
const deleteData /*{ xoaCuDan, xoaTaiKhoanCuDan, xoaTaiKhoanQuanTri }*/ = require('../utils/DeleteData');
router.get('/verify-mail/:token', async( req,res) => {
    return authAdmin.verifyEmailToken(req.params.token, res);
})

router.post('/register', async (req,res) =>{
    return await authAdmin.registrationAccount(req.body.data, res);
})


router.post('/api/themCuDan', async ( req,res) => {
    return postData.themCuDan(req.body.data,res);
})

router.get('/api/layDanhSachCuDan', async (req,res) =>{
    return getData.getResident(res);
})

router.put('/api/suaCuDan', async(req,res) =>{
    return await putData.suaCuDan(req.query.id, req.body.data, res);
})

router.delete('/api/xoaCuDan', async(req,res) => {
    return await deleteData.xoaCuDan(req.query.id, res);
})

router.get('/api/layDanhSachTaiKhoanCuDan', async(req,res) =>{
    return await getData.getTaiKhoanCuDan(res);
})

router.post('/api/themTaiKhoanCuDan', async(req,res) => {
    return postData.themTaiKhoanCuDan(req.body.data,res);
})

router.delete('/api/xoaTaiKhoanCuDan', async(req,res) =>{
    return deleteData.xoaTaiKhoanCuDan(req.query.id, res);
})

router.get('/api/profile', async(req,res) =>{
})
router.post('/api/taoTaiKhoanQuanTri', async(req,res) => {
    return await authAdmin.taoTaiKhoan(req.body.data,res);
})

router.get('/api/layDanhSachTaiKhoanQuanTri', async (req,res) =>{
    return await getData.getAccountAdmin(res);
})

router.put('/api/suaTaiKhoanQuanTri', async(req,res) =>{
    return await putData.suaTaiKhoan(req.query.id, req.body.data, res);
})

router.put('/api/thayDoiMatKhauTaiKhoan', async(req,res) =>{
    return await putData.thayDoiMatKhauTaiKhoan(req.query.id, req.body.data, res);
})

router.put('/api/thayDoiEmailTaiKhoan', async(req,res) => {
    return await putData.thayDoiEmailTaiKhoan(req.query.id, req.body.data, res);
})

router.delete('/api/xoaTaiKhoanQuanTri', async(req,res) =>{
    return await deleteData.xoaTaiKhoanQuanTri(req.query.id, res);
})

module.exports = router;