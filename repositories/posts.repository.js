const { Posts } = require('../models');

class PostRepository {
  // 게시글 전체 조회
  findAllPost = async (findOption) => await Posts.findAll(findOption);

  // 게시글 상세 조회
  findOnePost = async (findOption) => await Posts.findOne(findOption);

  // 게시글 작성
  createPost = async (createData) => await Posts.create(createData);

  // 게시글 수정
  updatePost = async (updateData, updateOption) =>
    await Posts.update(updateData, { where: updateOption });

  // 게시글 삭제
  deletePost = async (deleteOption) =>
    await Posts.destroy({ where: deleteOption });
}

module.exports = PostRepository;
