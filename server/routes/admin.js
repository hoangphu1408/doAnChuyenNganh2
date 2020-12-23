const router = require('express').Router();

const { registrationAccount, verifyEmailToken, taoTaiKhoan } =  require("../utils/Auth");
const { getTaiKhoanCuDan, getResident, getAccountAdmin } = require("../utils/GetData");
const { themCuDan, themTaiKhoanCuDan } = require('../utils/PostData');
const { suaCuDan, suaTaiKhoan, thayDoiMatKhauTaiKhoan, thayDoiEmailTaiKhoan } = require('../utils/PutData');
const { xoaCuDan, xoaTaiKhoanCuDan, xoaTaiKhoanQuanTri } = require('../utils/DeleteData');
router.get('/verify-mail/:token', async( req,res) => {
    return verifyEmailToken(req.params.token, res);
})

router.post('/register', async (req,res) =>{
    return await registrationAccount(req.body.data, res);
})


router.post('/api/themCuDan', async ( req,res) => {
    return themCuDan(req.body.data,res);
})

router.get('/api/layDanhSachCuDan', async (req,res) =>{
    return getResident(res);
})

router.put('/api/suaCuDan', async(req,res) =>{
    return await suaCuDan(req.query.id, req.body.data, res);
})

router.delete('/api/xoaCuDan', async(req,res) => {
    return await xoaCuDan(req.query.id, res);
})

router.get('/api/layDanhSachTaiKhoanCuDan', async(req,res) =>{
    return await getTaiKhoanCuDan(res);
})

router.post('/api/themTaiKhoanCuDan', async(req,res) => {
    return themTaiKhoanCuDan(req.body.data,res);
})

router.delete('/api/xoaTaiKhoanCuDan', async(req,res) =>{
    return xoaTaiKhoanCuDan(req.query.id, res);
})

router.get('/api/profile', async(req,res) =>{
})

router.post('/api/taoTaiKhoanQuanTri', async(req,res) => {
    return await taoTaiKhoan(req.body.data,res);
})

router.get('/api/layDanhSachTaiKhoanQuanTri', async (req,res) =>{
    return await getAccountAdmin(res);
})

router.put('/api/suaTaiKhoanQuanTri', async(req,res) =>{
    return await suaTaiKhoan(req.query.id, req.body.data, res);
})

router.put('/api/thayDoiMatKhauTaiKhoan', async(req,res) =>{
    return await thayDoiMatKhauTaiKhoan(req.query.id, req.body.data, res);
})

router.put('/api/thayDoiEmailTaiKhoan', async(req,res) => {
    return await thayDoiEmailTaiKhoan(req.query.id, req.body.data, res);
})

router.delete('/api/xoaTaiKhoanQuanTri', async(req,res) =>{
    return await xoaTaiKhoanQuanTri(req.query.id, res);
})

module.exports = router;