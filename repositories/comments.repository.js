const { Comments } = require('../models');

class CommentRepository {
  // 댓글 조회
  findAllComment = async (commentOption) => {
    const comments = await Comments.findAll(commentOption);
    return comments;
  };

  // 댓글 상세 조회
  findOneComment = async (commentOption) => {
    const comment = await Comments.findOne(commentOption);
    return comment;
  };

  // 댓글 작성
  createComment = async (commentOption) => {
    const createCommentData = await Comments.create(commentOption);
    return createCommentData;
  };

  // 댓글 수정
  updateComment = async (commentData, commentOption) => {
    const updateCommentData = await Comments.update(commentData, commentOption);
    return updateCommentData;
  };

  // 댓글 삭제
  deleteComment = async (commentOption) => {
    const deleteCommentData = await Comments.destroy(commentOption);
    return deleteCommentData;
  };
}

module.exports = CommentRepository;
