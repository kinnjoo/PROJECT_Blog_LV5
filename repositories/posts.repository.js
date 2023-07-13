const { Posts } = require('../models');

class PostRepository {
  // 게시글 전체 조회
  findAllPost = async (postOption) => {
    const posts = await Posts.findAll(postOption);
    return posts;
  };

  // 게시글 상세 조회
  findOnePost = async (postOption) => {
    const post = await Posts.findOne(postOption);
    return post;
  };

  // 게시글 작성
  createPost = async (postOption) => {
    const createPostData = await Posts.create(postOption);
    return createPostData;
  };
}

module.exports = PostRepository;
