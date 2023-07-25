const { Users } = require('../models');

class UserRepository {
  // 회원가입
  signupUser = async (userData) => {
    const signupUserData = await Users.create(userData);

    return signupUserData;
  };

  // DB에서 User 찾기
  findOneUser = async (userOption) => {
    return await Users.findOne(userOption);
  };
}

module.exports = UserRepository;
