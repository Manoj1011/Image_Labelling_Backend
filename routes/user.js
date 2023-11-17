const express = require('express');
const {userController} = require('../controllers');
const { isAuth } = require("../middlewares");

const router = express.Router();

router.post('/add-label',isAuth,userController.addLabel);
router.post('/edit-label',isAuth,userController.editLabel);
router.post('/delete-label',isAuth,userController.deleteLabel);
router.get('/get-images',isAuth, userController.getImagesForCommonDashboard);
router.get('/home',isAuth,userController.home);
router.post('/geturl',isAuth,userController.getImage);
router.get('/getlabels',isAuth,userController.getLabels);

module.exports = router;