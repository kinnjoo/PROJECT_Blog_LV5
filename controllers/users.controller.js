const UserService = require('../services/users.service.js');

// User의 컨트롤러 역할을 하는 클래스
class UsersController {
  userService = new UserService(); // User 서비스 클래스를 컨트롤러 클래스의 멤버 변수로 할당

  // 회원가입
  signupUser = async (req, res, next) => {
    const { nickname, password, confirmPassword } = req.body;

    try {
      const signupUserData = await this.userService.signupUser(
        nickname,
        password,
        confirmPassword
      );

      if (!signupUserData) {
        return res
          .status(400)
          .json({ errorMessage: '회원 가입에 실패하였습니다.' });
      }
      return res
        .status(201)
        .json({ user: signupUserData, message: '회원 가입에 성공하였습니다.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        errorMessage: '예상치 못한 에러로 인해 회원 가입에 실패하였습니다.',
      });
      return;
    }
  };
}

module.exports = UsersController;
