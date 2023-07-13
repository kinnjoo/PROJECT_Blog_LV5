const express = require('express');
const router = express.Router();

const PostsController = require('../controllers/posts.controller.js');
const postsController = new PostsController();

// 게시글 전체 조회
router.get('/', postsController.getPosts);

module.exports = router;
