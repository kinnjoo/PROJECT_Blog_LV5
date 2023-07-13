const UserService = require('../services/users.service.js');

// User의 컨트롤러 역할을 하는 클래스
class UsersController {
  userService = new UserService(); // User 서비스 클래스를 컨트롤러 클래스의 멤버 변수로 할당

  // 회원가입
  signupUser = async (req, res) => {
    const { nickname, password, confirmPassword } = req.body;
    const { status, message } = await this.userService.signupUser(
      nickname,
      password,
      confirmPassword
    );

    return res.status(status).json({ message });
  };

  // 로그인
  loginUser = async (req, res) => {
    const { nickname, password } = req.body;
    const { status, message, token } = await this.userService.doLogin(
      nickname,
      password
    );

    res.cookie('Authorization', `Bearer ${token}`);
    return res.status(status).json({ message });
  };
}

module.exports = UsersController;
