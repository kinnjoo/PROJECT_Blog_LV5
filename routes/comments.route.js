const express = require('express');
const router = express.Router();

const CommentsController = require('../controllers/comments.controller.js');
const commentsController = new CommentsController();

// 댓글 조회
router.get('/', commentsController.getComments);

module.exports = router;
