const express = require("express");

const { uploadController } = require("../controllers");
const { isAuth } = require("../middlewares");

const router = express.Router();

router.post("/single-s3", isAuth, uploadController.singleS3);

module.exports = router;
