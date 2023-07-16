const PostService = require('../services/posts.service.js');

class PostsController {
  postService = new PostService();

  // 게시글 전체 조회
  getPosts = async (req, res) => {
    const pageSize = Number(req.query.pageSize ? req.query.pageSize : 10);
    const pageNum = Number(req.query.pageNum ? req.query.pageNum : 1);

    const { status, message, posts } = await this.postService.findPosts(
      pageSize,
      pageNum
    );

    return res.status(status).json({ message, posts });
  };

  // 게시글 상세 조회
  getPostById = async (req, res) => {
    const { postId } = req.params;

    const { status, message, post } = await this.postService.findOnePost(
      postId
    );

    return res.status(status).json({ message, post });
  };

  // 게시글 작성
  createPost = async (req, res) => {
    const { title, content } = req.body;
    const userId = res.locals.userId;

    const { status, message } = await this.postService.createPost(
      title,
      content,
      userId
    );

    return res.status(status).json({ message });
  };

  // 게시글 수정
  updatePost = async (req, res) => {
    const { title, content } = req.body;
    const { postId } = req.params;
    const userId = res.locals.userId;

    const { status, message } = await this.postService.updatePost(
      title,
      content,
      postId,
      userId
    );

    return res.status(status).json({ message });
  };

  // 게시글 삭제
  deletePost = async (req, res) => {
    const { postId } = req.params;
    const userId = res.locals.userId;

    const { status, message } = await this.postService.deletePost(
      postId,
      userId
    );

    return res.status(status).json({ message });
  };
}

module.exports = PostsController;
