const { Comments } = require('../models');

class CommentRepository {
  // 댓글 조회
  findAllComment = async (findOption) => await Comments.findAll(findOption);

  // 댓글 상세 조회
  findOneComment = async (findOption) => await Comments.findOne(findOption);

  // 댓글 작성
  createComment = async (createData) => await Comments.create(createData);

  // 댓글 수정
  updateComment = async (updateData, updateOption) =>
    await Comments.update(updateData, { where: updateOption });

  // 댓글 삭제
  deleteComment = async (deleteOption) =>
    await Comments.destroy({ where: deleteOption });
}

module.exports = CommentRepository;
