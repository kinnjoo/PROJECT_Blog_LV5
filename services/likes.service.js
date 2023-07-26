const LikeRepository = require('../repositories/likes.repository.js');
const PostRepository = require('../repositories/posts.repository.js');
const { Users, Posts } = require('../models');

class LikeService {
  likeRepository = new LikeRepository();
  postRepository = new PostRepository();

  // 좋아요 한 게시글 조회
  findLikedPosts = async (userId) => {
    const likedPosts = await this.likeRepository.findAllLiked({
      where: { userId },
      attributes: ['postId'],
      include: [
        {
          model: Users,
          attributes: ['nickname'],
        },
        {
          model: Posts,
          attributes: ['title', 'content', 'likeCount'],
        },
      ],
      order: [[Posts, 'likeCount', 'DESC']],
    });

    if (likedPosts.length === 0) {
      return {
        status: 200,
        message: '아직 좋아요한 게시글이 없습니다.',
      };
    }

    return {
      status: 200,
      likedPosts,
    };
  };

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

    const findLikeData = await this.likeRepository.findOneLiked({
      where: { postId: findPostData.postId, userId },
    });

    if (!findLikeData) {
      await this.postRepository.updatePost(
        { likeCount: findPostData.likeCount + 1 },
        { postId: findPostData.postId }
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
      { likeCount: findPostData.likeCount - 1 },
      { postId: findPostData.postId }
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
