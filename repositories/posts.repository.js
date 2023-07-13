const { Posts } = require('../models');

class PostRepository {
  // 게시글 전체 조회
  findAllPost = async (options) => {
    const posts = await Posts.findAll(options);

    return posts;
  };

  // 게시글 상세 조회
  findOnePost = async (option) => {
    const post = await Posts.findOne({ whrer: { option } });

    return post;
  };
}

module.exports = PostRepository;
