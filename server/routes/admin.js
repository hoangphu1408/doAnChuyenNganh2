const router = require('express').Router();

const { registrationAccount, verifyEmailToken } =  require("../utils/Auth");
const { getAccount, getResident } = require("../utils/GetData");
const { themCuDan, themTaiKhoanCuDan } = require('../utils/PostData');
const { suaCuDan } = require('../utils/PutData');
const { xoaCuDan, xoaTaiKhoanCuDan } = require('../utils/DeleteData');
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

router.post('/api/themTaiKhoanCuDan', async(req,res) => {
    console.log(req.body);
    return themTaiKhoanCuDan(req.body.data,res);
})

router.delete('/api/xoaTaiKhoanCuDan', async(req,res) =>{
    //console.log(req.query.id);
    return xoaTaiKhoanCuDan(req.query.id, res);
})

module.exports = router;