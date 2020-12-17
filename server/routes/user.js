const router = require('express').Router();
const { loginAccount } =  require('../utils/Auth');


router.post('/login', async (req,res) => {
    return await loginAccount(req.body.data, res);
})

module.exports = router;