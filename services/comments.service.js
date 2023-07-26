const CommentRepository = require('../repositories/comments.repository.js');
const PostRepository = require('../repositories/posts.repository.js');
const { Users } = require('../models');

class CommentService {
  commentRepository = new CommentRepository();
  postRepository = new PostRepository();

  // 댓글 조회
  findComments = async (pageSize, pageNum, postId) => {
    if (isNaN(pageSize) || isNaN(pageNum) || pageSize < 1 || pageNum < 1) {
      (pageSize = 10), (pageNum = 1);
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
  createComment = async (content, postId, userId) => {
    if (!content) {
      return {
        status: 400,
        message: '댓글 내용이 비어있습니다.',
      };
    }

    await this.commentRepository.createComment({
      content,
      postId,
      userId,
    });

    return {
      status: 201,
      message: '댓글을 작성하였습니다.',
    };
  };

  // 댓글 수정
  updateComment = async (content, postId, commentId, userId) => {
    if (!content) {
      return {
        status: 412,
        message: '댓글 내용이 비어있습니다.',
      };
    }

    const findPostData = await this.postRepository.findOnePost({
      where: { postId },
    });

    const findCommentData = await this.commentRepository.findOneComment({
      where: { commentId, userId },
    });

    if (
      !findPostData ||
      !findCommentData ||
      findPostData.postId !== findCommentData.postId
    ) {
      return {
        status: 404,
        message: '잘못된 접근 방법입니다.',
      };
    }

    await this.commentRepository.updateComment({ content }, { commentId });

    return {
      status: 200,
      message: '댓글을 수정하였습니다.',
    };
  };

  // 댓글 삭제
  deleteComment = async (postId, commentId, userId) => {
    const findPostData = await this.postRepository.findOnePost({
      where: { postId },
    });

    const findCommentData = await this.commentRepository.findOneComment({
      where: { commentId, userId },
    });

    if (
      !findPostData ||
      !findCommentData ||
      findPostData.postId !== findCommentData.postId
    ) {
      return {
        status: 404,
        message: '잘못된 접근 방법입니다.',
      };
    }

    await this.commentRepository.deleteComment({ commentId });

    return {
      status: 200,
      message: '댓글을 삭제하였습니다.',
    };
  };
}

module.exports = CommentService;
