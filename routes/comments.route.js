const express = require('express');
const router = express.Router();

const CommentsController = require('../controllers/comments.controller.js');
const commentsController = new CommentsController();

const authMiddleware = require('../middlewares/auth.middleware.js');

// 댓글 조회
router.get('/:postId/comments', commentsController.getComments);

// 댓글 작성
router.post(
  '/:postId/comments',
  authMiddleware,
  commentsController.createComment
);

module.exports = router;
