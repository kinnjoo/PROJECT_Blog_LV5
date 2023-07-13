const express = require('express');
const router = express.Router();

const usersRouter = require('./users.route.js');
const postsRouter = require('./posts.route.js');
const commentsRouter = require('./comments.route.js');

router.use('/users', usersRouter);
router.use('/posts', postsRouter);
router.use('/posts', commentsRouter);

module.exports = router;
