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

  // 댓글 수정
  updateComment = async (content, userId, commentId) => {
    const findCommentId = await this.commentRepository.findOneComment({
      where: { commentId },
    });

    if (!findCommentId) {
      return {
        status: 404,
        message: '존재하지 않는 댓글입니다.',
      };
    } else if (userId !== findCommentId.UserId) {
      return {
        status: 403,
        message: '해당 댓글의 수정 권한이 없습니다.',
      };
    } else if (!content) {
      return {
        status: 412,
        message: '댓글 내용이 비어있습니다.',
      };
    }

    await this.commentRepository.updateComment(
      { content },
      { where: { commentId } }
    );

    return {
      status: 200,
      message: '댓글을 수정하였습니다.',
    };
  };
}

module.exports = CommentService;
