const { Likes } = require('../models');

class LikeRepository {
  findAllLiked = async (likeOption) => await Likes.findAll(likeOption);

  // likeData 찾기
  findOneLiked = async (likeOption) => await Likes.findOne(likeOption);

  // 좋아요
  postLike = async (likeOption) => await Likes.create(likeOption);

  // 좋아요 취소
  postUnlike = async (unlikeOption) => await Likes.destroy(unlikeOption);
}

module.exports = LikeRepository;
