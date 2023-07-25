const { Comments } = require('../models');

class CommentRepository {
  // 댓글 조회
  findAllComment = async (commentOption) =>
    await Comments.findAll(commentOption);

  // 댓글 상세 조회
  findOneComment = async (commentOption) =>
    await Comments.findOne(commentOption);

  // 댓글 작성
  createComment = async (commentData) => await Comments.create(commentData);

  // 댓글 수정
  updateComment = async (commentData, commentOption) =>
    await Comments.update(commentData, commentOption);

  // 댓글 삭제
  deleteComment = async (commentOption) =>
    await Comments.destroy(commentOption);
}

module.exports = CommentRepository;
