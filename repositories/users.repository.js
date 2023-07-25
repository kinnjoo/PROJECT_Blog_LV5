const { Users } = require('../models');

class UserRepository {
  // 회원가입
  signupUser = async (userData) => await Users.create(userData);

  // DB에서 User 찾기
  findOneUser = async (userOption) => await Users.findOne(userOption);
}

module.exports = UserRepository;
