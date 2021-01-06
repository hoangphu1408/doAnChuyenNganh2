const router = require("express").Router();
const { loginAccount } = require("../utils/Auth");
const getData = require("../utils/GetData");
router.post("/login", async (req, res) => {
  return await loginAccount(req.body.data, res);
});

router.get("/user/api/getParkingFee", async (req, res) => {
  console.log(req.query.cu_dan);
  return await getData.getParkingFeeUser(req.query.cu_dan, res);
});

router.get("/user/api/getWaterFee", async (req, res) => {
  return await getData.getWaterFeeUser(req.query.cu_dan, res);
});

router.get("/user/api/getServiceFee", async (req, res) => {
  return await getData.getServiceFeeUser(req.query.cu_dan, res);
});
module.exports = router;
