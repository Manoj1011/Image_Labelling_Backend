const express = require('express');
const {authController} = require('../controllers');
const {isAuth} = require('../middlewares')

const router = express.Router();

router.post('/signup',authController.signup);
router.post('/signin', authController.signin);
router.post("/status", isAuth, (req, res) => {
    res.status(200).json({
      success: true,
      data: req.auth.user,
    });
  });

module.exports = router;