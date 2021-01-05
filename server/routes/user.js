const router = require("express").Router();
const { loginAccount } = require("../utils/Auth");
const getData = require("../utils/GetData");
router.post("/login", async (req, res) => {
  return await loginAccount(req.body.data, res);
});

router.get("/user/api/getParkingfee", async (req, res) => {
  console.log(req.query.cu_dan);
  return await getData.getBillUser(req.query.cu_dan, res);
});

module.exports = router;
