const { Posts } = require('../models');

class PostRepository {
  // 게시글 전체 조회
  findAllPost = async (options) => {
    const posts = await Posts.findAll(options);

    return posts;
  };
}

module.exports = PostRepository;
