const express = require('express');
const router = express.Router();

const CommentsController = require('../controllers/comments.controller.js');
const commentsController = new CommentsController();

const authMiddleware = require('../middlewares/auth.middleware.js');

// 댓글 조회
router.get('/posts/:postId/comments', commentsController.getComments);

// 댓글 작성
router.post(
  '/posts/:postId/comments',
  authMiddleware,
  commentsController.createComment
);

// 댓글 수정
router.put(
  '/posts/:postId/comments/:commentId',
  authMiddleware,
  commentsController.updateComment
);

// 댓글 삭제
router.delete(
  '/posts/:postId/comments/:commentId',
  authMiddleware,
  commentsController.deleteComment
);

module.exports = router;
