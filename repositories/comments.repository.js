const { Comments } = require('../models');

class CommentRepository {
  // 댓글 조회
  findAllComment = async (commentOption) => {
    const comments = await Comments.findAll(commentOption);
    return comments;
  };

  // 댓글 작성
  createComment = async (commentOption) => {
    const createCommentData = await Comments.create(commentOption);
    return createCommentData;
  };
}

module.exports = CommentRepository;
