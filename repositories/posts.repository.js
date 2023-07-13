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

  // 게시글 수정
  updatePost = async (postData, postOption) => {
    const updatePostData = await Posts.update(postData, postOption);
    return updatePostData;
  };

  // 게시글 삭제
  deletePost = async (postOption) => {
    const deletePostData = await Posts.destroy(postOption);
    return deletePostData;
  };
}

module.exports = PostRepository;
