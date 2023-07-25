const LikeService = require('../services/likes.service.js');

class LikesController {
  likeService = new LikeService();

  // 좋아요한 게시글 조회
  getLikedPosts = async (req, res) => {
    const userId = res.locals.userId;

    const { status, message, likedPosts } =
      await this.likeService.findLikedPosts(userId);

    return res.status(status).json({ message, likedPosts });
  };

  // 좋아요, 좋아요 취소
  postLikeUnlike = async (req, res) => {
    const { postId } = req.params;
    const userId = res.locals.userId;

    const { status, message } = await this.likeService.postLikeUnlike(
      postId,
      userId
    );

    return res.status(status).json({ message });
  };
}

module.exports = LikesController;
