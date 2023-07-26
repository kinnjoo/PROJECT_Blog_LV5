const { Likes } = require('../models');

class LikeRepository {
  findAllLiked = async (findOption) => await Likes.findAll(findOption);

  // likeData 찾기
  findOneLiked = async (findOption) => await Likes.findOne(findOption);

  // 좋아요
  postLike = async (likeData) => await Likes.create(likeData);

  // 좋아요 취소
  postUnlike = async (unlikeData) => await Likes.destroy(unlikeData);
}

module.exports = LikeRepository;
