const { Likes } = require('../models');

class LikeRepository {
  // likeId 찾기
  findOneByLikeId = async (likeOption) => {
    const likeId = await Likes.findOne(likeOption);
    return likeId;
  };

  // 좋아요
  postLike = async (likeOption) => {
    const like = await Likes.create(likeOption);
    return like;
  };

  // 좋아요 취소
  postUnlike = async (unlikeOption) => {
    const unlike = await Likes.destroy(unlikeOption);
    return unlike;
  };
}

module.exports = LikeRepository;
