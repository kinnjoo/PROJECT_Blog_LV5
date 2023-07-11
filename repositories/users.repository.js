const { Users } = require('../models');

class UserRepository {
  signupUser = async (nickname, password) => {
    const signupUserData = await Users.create({
      nickname,
      password,
    });

    return signupUserData;
  };
}

module.exports = UserRepository;
