const { Posts } = require('../models');

class PostRepository {
  // 게시글 전체 조회
  findAllPost = async (postOption) => await Posts.findAll(postOption);

  // 게시글 상세 조회
  findOnePost = async (postOption) => await Posts.findOne(postOption);

  // 게시글 작성
  createPost = async (postData) => await Posts.create(postData);

  // 게시글 수정
  updatePost = async (postData, postOption) =>
    await Posts.update(postData, postOption);

  // 게시글 삭제
  deletePost = async (postOption) => await Posts.destroy(postOption);
}

module.exports = PostRepository;
