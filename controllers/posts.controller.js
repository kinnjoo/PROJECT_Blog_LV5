const PostService = require('../services/posts.service.js');

class PostsController {
  postService = new PostService();

  // 게시글 전체 조회
  getPosts = async (req, res) => {
    const pageSize = Number(req.query.pageSize ? req.query.pageSize : 10);
    const pageNum = Number(req.query.pageNum ? req.query.pageNum : 1);

    const { status, message, posts } = await this.postService.findAllPost(
      pageSize,
      pageNum
    );

    return res.status(status).json({ message, posts });
  };

  // 게시글 상세 조회
  getPostById = async (req, res) => {
    const { postId } = req.param;

    const { status, message, post } = await this.postService.findOnePost(
      postId
    );

    return res.status(status).json({ message, post });
  };
}

module.exports = PostsController;
