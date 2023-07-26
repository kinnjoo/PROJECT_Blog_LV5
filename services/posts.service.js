const PostRepository = require('../repositories/posts.repository.js');
const { Users } = require('../models');

class PostService {
  postRepository = new PostRepository();

  // 게시글 전체 조회
  findPosts = async (pageSize, pageNum) => {
    if (isNaN(pageSize) || isNaN(pageNum) || pageSize < 1 || pageNum < 1) {
      (pageSize = 10), (pageNum = 1);
    }

    try {
      const posts = await this.postRepository.findAllPost({
        attributes: ['postId', 'title', 'likeCount', 'createdAt'],
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

  // 게시글 상세 조회
  findOnePost = async (postId) => {
    const post = await this.postRepository.findOnePost({
      where: { postId },
      attributes: [
        'postId',
        'title',
        'content',
        'likeCount',
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
      return {
        status: 404,
        message: '존재하지 않는 게시글입니다.',
      };
    }

    return {
      status: 200,
      post,
    };
  };

  // 게시글 작성
  createPost = async (title, content, userId) => {
    if (!title || !content) {
      return {
        status: 400,
        message: '게시글 제목 또는 내용이 비어있습니다.',
      };
    }

    await this.postRepository.createPost({ title, content, userId });

    return {
      status: 201,
      message: '게시글을 생성하였습니다.',
    };
  };

  // 게시글 수정
  updatePost = async (title, content, postId, userId) => {
    if (!title || !content) {
      return {
        status: 412,
        message: '게시글 제목 또는 내용이 비어있습니다.',
      };
    }

    const findPostData = await this.postRepository.findOnePost({
      where: { postId, userId },
    });

    if (!findPostData) {
      return {
        status: 404,
        message: '잘못된 접근 방법입니다.',
      };
    }

    await this.postRepository.updatePost({ title, content }, { postId });

    return {
      status: 200,
      message: '게시글을 수정하였습니다.',
    };
  };

  // 게시글 삭제
  deletePost = async (postId, userId) => {
    const findPostData = await this.postRepository.findOnePost({
      where: { postId, userId },
    });

    if (!findPostData) {
      return {
        status: 404,
        message: '잘못된 접근 방법입니다.',
      };
    }

    await this.postRepository.deletePost({ postId });

    return {
      status: 200,
      message: '게시글을 삭제하였습니다.',
    };
  };
}

module.exports = PostService;
