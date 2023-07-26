const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/users.controller.js');
const usersController = new UsersController();

// 회원가입
router.post('/signup', usersController.signupUser);

// 로그인
router.post('/login', usersController.loginUser);

module.exports = router;
