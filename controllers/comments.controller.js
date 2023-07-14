const CommentService = require('../services/comments.service.js');

class CommentsController {
  commentService = new CommentService();

  // 댓글 조회
  getComments = async (req, res) => {
    const pageSize = Number(req.query.pageSize ? req.query.pageSize : 10);
    const pageNum = Number(req.query.pageNum ? req.query.pageNum : 1);
    const { postId } = req.params;

    const { status, message, comments } =
      await this.commentService.findAllComment(pageSize, pageNum, postId);

    return res.status(status).json({ message, comments });
  };

  // 댓글 작성
  createComment = async (req, res) => {
    const { content } = req.body;
    const { postId } = req.params;
    const userId = res.locals.userId;

    const { status, message } = await this.commentService.createComment(
      content,
      userId,
      postId
    );

    return res.status(status).json({ message });
  };

  // 댓글 수정
  updateComment = async (req, res) => {
    const { content } = req.body;
    const { commentId } = req.params;
    const userId = res.locals.userId;

    const { status, message } = await this.commentService.updateComment(
      content,
      userId,
      commentId
    );

    return res.status(status).json({ message });
  };

  // 댓글 삭제
  deleteComment = async (req, res) => {
    const { commentId } = req.params;
    const userId = res.locals.userId;

    const { status, message } = await this.commentService.deleteComment(
      userId,
      commentId
    );

    return res.status(status).json({ message });
  };
}

module.exports = CommentsController;
