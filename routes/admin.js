const express = require('express');
const {adminController} = require('../controllers');
const { isAuth } = require("../middlewares");

const router = express.Router();

router.post('/create-label',isAuth,adminController.createLabel);
router.post('/delete-label',isAuth,adminController.deleteLabel);
router.post('/create-image',isAuth,adminController.createImage);

module.exports = router;