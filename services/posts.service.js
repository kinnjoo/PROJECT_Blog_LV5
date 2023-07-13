const PostRepository = require('../repositories/posts.repository.js');
const { Users } = require('../models');

class PostService {
  postRepository = new PostRepository();

  // 게시글 전체 조회
  findAllPost = async (pageSize, pageNum) => {
    if (isNaN(pageSize) || isNaN(pageNum)) {
      return { status: 400, message: '잘못된 페이지 입력값입니다.' };
    }

    try {
      const posts = await this.postRepository.findAllPost({
        attributes: ['postId', 'title', 'likes', 'createdAt'],
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

      if (posts.length === 0) {
        return { status: 200, message: '아직 작성된 게시글이 없습니다.' };
      }

      return { status: 200, posts };
    } catch (error) {
      console.error(error);
      return {
        status: 500,
        message: '예상치 못한 오류로 인해 게시글 전체 조회에 실패하였습니다.',
      };
    }
  };

  // 게시글 상세 조회
  findOnePost = async (postId) => {
    const post = await this.postRepository.findOnePost({
      where: { postId },
      attributes: [
        'postId',
        'title',
        'content',
        'likes',
        'createdAt',
        'updatedAt',
      ],
      include: [
        {
          model: Users,
          attributes: ['nickname'],
        },
      ],
    });

    if (!post) {
      return { status: 404, message: '존재하지 않는 게시글입니다.' };
    }

    return { status: 200, post };
  };
}

module.exports = PostService;
