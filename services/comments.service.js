const CommentRepository = require('../repositories/comments.repository.js');
const { Users } = require('../models');

class CommentService {
  commentRepository = new CommentRepository();

  // 댓글 조회
  findAllComment = async () => {
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

  // 댓글 작성
  createComment = async (content, userId, postId) => {
    if (!content) {
      return {
        status: 400,
        message: '댓글 내용이 비어있습니다.',
      };
    }

    await this.commentRepository.createComment({
      content,
      UserId: userId,
      PostId: postId,
    });

    return {
      status: 201,
      message: '댓글을 작성하였습니다.',
    };
  };
}

module.exports = CommentService;
