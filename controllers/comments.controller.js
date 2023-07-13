const CommentService = require('../services/comments.service.js');

class CommentsController {
  commentService = new CommentService();

  // 댓글 조회
  getComments = async (req, res) => {
    const { postId } = req.params;

    const { status, message } = await this.commentService.findAllComment(
      postId
    );

    return res.status(status).json({ message });
  };
}

module.exports = CommentsController;
