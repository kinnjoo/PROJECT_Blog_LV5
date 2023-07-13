const CommentRepository = require('../repositories/comments.repository.js');
const { Users } = require('../models');

class CommentService {
  commentRepository = new CommentRepository();

  // 댓글 조회
  findAllComment = async (postId) => {
    const comments = await this.commentRepository.findAllComment({
      attributes: ['commentId', 'content', 'createdAt', 'updatedAt'],
      include: [
        {
          model: Users,
          attributes: ['nickname'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    if (comments.length === 0) {
      return {
        status: 200,
        message: '아직 작성된 댓글이 없습니다.',
      };
    }

    return {
      status: 200,
      comments,
    };
  };
}

module.exports = CommentService;
