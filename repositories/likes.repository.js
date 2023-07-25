const { Likes } = require('../models');

class LikeRepository {
  findAllLiked = async (likeOption) => {
    const likeAllData = await Likes.findAll(likeOption);
    return likeAllData;
  };

  // likeData 찾기
  findOneLiked = async (likeOption) => {
    const likeData = await Likes.findOne(likeOption);
    return likeData;
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
