const express = require("express");
const router = express.Router();

const authRoute = require("./auth");
const adminRoute = require("./admin");
const userRoute = require("./user");
const uploadRoute = require("./upload");

router.use("/auth",authRoute);
router.use("/admin",adminRoute);
router.use("/upload",uploadRoute);
router.use("/user",userRoute);

module.exports = router;
