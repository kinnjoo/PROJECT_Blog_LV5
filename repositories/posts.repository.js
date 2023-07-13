const { Posts } = require('../models');

class PostRepository {
  // 게시글 전체 조회
  findAllPost = async (pageOptions) => {
    const posts = await Posts.findAll(pageOptions);
    return posts;
  };

  // 게시글 상세 조회
  findOnePost = async (option) => {
    const post = await Posts.findOne(option);
    return post;
  };
}

module.exports = PostRepository;
