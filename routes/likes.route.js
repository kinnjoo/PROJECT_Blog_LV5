const express = require('express');
const router = express.Router();

const LikesController = require('../controllers/likes.controller.js');
const likesController = new LikesController();

const authMiddleware = require('../middlewares/auth.middleware.js');

// 좋아요한 게시글 조회
router.get('/likes/posts', authMiddleware, likesController.getLikedPosts);

// 좋아요, 좋아요 취소
router.post(
  '/likes/posts/:postId',
  authMiddleware,
  likesController.postLikeUnlike
);

module.exports = router;
