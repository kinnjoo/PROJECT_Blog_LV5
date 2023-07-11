const { Users } = require('../models');

class UserRepository {
  // 회원가입
  signupUser = async (nickname, password) => {
    const signupUserData = await Users.create({
      nickname,
      password,
    });

    return signupUserData;
  };

  // DB에서 User 찾기
  findOneByNickname = async (nickname) => {
    return await Users.findOne({ where: { nickname } });
  };
}

module.exports = UserRepository;
