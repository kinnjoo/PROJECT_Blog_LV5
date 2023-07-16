const LikeRepository = require('../repositories/likes.repository.js');
const PostRepository = require('../repositories/posts.repository.js');

class LikeService {
  likeRepository = new LikeRepository();
  postRepository = new PostRepository();

  // 좋아요, 좋아요 취소
  postLikeUnlike = async (postId, userId) => {
    const findPostData = await this.postRepository.findOnePost({
      where: { postId },
    });

    if (!findPostData) {
      return {
        status: 404,
        message: '존재하지 않는 게시글입니다.',
      };
    }

    const findLikeData = await this.likeRepository.findOneByLikeId({
      where: { postId: findPostData.postId, userId },
    });

    if (!findLikeData) {
      await this.postRepository.updatePost(
        { likeCount: findPostData.likeCount + 1 },
        { where: { postId: findPostData.postId } }
      );
      await this.likeRepository.postLike({
        postId: findPostData.postId,
        userId,
      });
      return {
        status: 200,
        message: '게시물에 좋아요를 눌렀습니다.',
      };
    }

    await this.postRepository.updatePost(
      { likeCount: findPostData.likes - 1 },
      { where: { postId: findPostData.postId } }
    );
    await this.likeRepository.postUnlike({
      where: { postId: findPostData.postId, userId },
    });
    return {
      status: 200,
      message: '좋아요를 취소했습니다.',
    };
  };
}

module.exports = LikeService;
