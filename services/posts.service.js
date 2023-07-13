const PostRepository = require('../repositories/posts.repository.js');
const { Users } = require('../models');

class PostService {
  postRepository = new PostRepository();

  // 게시글 전체 조회
  findAllPost = async (pageSize, pageNum) => {
    if (isNaN(pageSize)) {
      return {
        status: 412,
        message: '잘못된 페이지 입력값입니다.',
        posts: null,
      };
    }

    try {
      let posts = await this.postRepository.findAllPost({
        include: {
          model: Users,
          attributes: ['nickname'],
        },
        limit: pageSize,
        offset: (pageNum - 1) * pageSize,
        order: [['createdAt', 'DESC']],
      });

      posts = posts.map((post) => {
        return {
          postId: post.postId,
          nickname: post.Users.nickname,
          title: post.title,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
        };
      });

      if (posts.length === 0) {
        return {
          status: 200,
          message: '아직 작성된 게시글이 없습니다.',
          posts: null,
        };
      }

      return {
        status: 200,
        message: null,
        posts,
      };
    } catch (error) {
      console.error(error);
      return {
        status: 500,
        message: '예상치 못한 오류로 인해 게시글 전체 조회에 실패하였습니다.',
      };
    }
  };
}

module.exports = PostService;
