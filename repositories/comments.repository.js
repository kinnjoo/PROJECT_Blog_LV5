const { Comments } = require('../models');

class CommentRepository {
  // 댓글 조회
  findAllComment = async (commentOption) => {
    const comments = await Comments.findAll(commentOption);
    return comments;
  };
}

module.exports = CommentRepository;
