const express = require('express');
const router = express.Router();

const usersRouter = require('./users.route.js');
const postsRouter = require('./posts.route.js');
const commentsRouter = require('./comments.route.js');
const likesRouter = require('./likes.route.js');

router.use('/', usersRouter);
router.use('/', postsRouter);
router.use('/', commentsRouter);
router.use('/', likesRouter);

module.exports = router;
