const CommentRepository = require('../repositories/comments.repository.js');
const { Users } = require('../models');

class CommentService {
  commentRepository = new CommentRepository();

  // 댓글 조회
  findAllComment = async (pageSize, pageNum, postId) => {
    if (isNaN(pageSize) || isNaN(pageNum) || pageSize < 1 || pageNum < 1) {
      return {
        status: 400,
        message: '잘못된 페이지 입력값입니다.',
      };
    }

    const comments = await this.commentRepository.findAllComment({
      where: { postId },
      attributes: ['commentId', 'content', 'createdAt', 'updatedAt'],
      include: [
        {
          model: Users,
          attributes: ['nickname'],
        },
      ],
      limit: pageSize,
      offset: (pageNum - 1) * pageSize,
      order: [['createdAt', 'DESC']],
    });

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
      userId,
      postId,
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
    } else if (userId !== findCommentId.userId) {
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

  // 댓글 삭제
  deleteComment = async (userId, commentId) => {
    const findCommentId = await this.commentRepository.findOneComment({
      where: { commentId },
    });

    if (!findCommentId) {
      return {
        status: 404,
        message: '존재하지 않는 댓글입니다.',
      };
    } else if (userId !== findCommentId.userId) {
      return {
        status: 403,
        message: '해당 댓글의 삭제 권한이 없습니다.',
      };
    }

    await this.commentRepository.deleteComment({ where: { commentId } });

    return {
      status: 200,
      message: '댓글을 삭제하였습니다.',
    };
  };
}

module.exports = CommentService;
