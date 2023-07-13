const { Posts } = require('../models');

class PostRepository {
  // 게시글 전체 조회
  findAllPost = async (options) => {
    const posts = await Posts.findAll(options);
    return posts;
  };

  // 게시글 상세 조회
  findOnePost = async (postId) => {
    const post = await Posts.findOne({ where: { postId } });
    return post;
  };
}

module.exports = PostRepository;
