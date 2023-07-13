const express = require('express');
const router = express.Router();

const PostsController = require('../controllers/posts.controller.js');
const postsController = new PostsController();

const authMiddleware = require('../middlewares/auth.middleware.js');

// 게시글 전체 조회
router.get('/', postsController.getPosts);

// 게시글 상세 조회
router.get('/:postId', postsController.getPostById);

// 게시글 작성
router.post('/', authMiddleware, postsController.createPost);

module.exports = router;
