const CommentService = require('../services/comments.service.js');

class CommentsController {
  commentService = new CommentService();

  // 댓글 조회
  getComments = async (req, res) => {
    const { postId } = req.params;

    const { status, message, comments } =
      await this.commentService.findAllComment(postId);

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
}

module.exports = CommentsController;
