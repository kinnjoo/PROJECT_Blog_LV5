const jwt = require('jsonwebtoken');
const secretKey = require('../config/secretKey.json');

const UserRepository = require('../repositories/users.repository.js');

class UserService {
  userRepository = new UserRepository();

  signupUser = async (nickname, password, confirmPassword) => {
    // 닉네임 : 알파벳 대소문자, 숫자, 3자 이상 10자 이하
    const checkNickname = /^[a-zA-Z0-9]{3,10}$/;

    const userByNickname = await this.userRepository.findOneByNickname(
      nickname
    );

    // 닉네임, 비밀번호 형식 체크
    if (!nickname || !password || !confirmPassword) {
      return {
        status: 400,
        message: '모든 항목을 입력해주셔야 합니다.',
      };
    } else if (!checkNickname.test(nickname)) {
      return {
        status: 412,
        message: '닉네임의 형식이 올바르지 않습니다.',
      };
    }

    if (password.length < 4 || password.includes(nickname)) {
      return {
        status: 412,
        message:
          '패스워드는 4글자 이상이어야 하며 닉네임을 포함할 수 없습니다.',
      };
    } else if (password !== confirmPassword) {
      return {
        status: 412,
        message: '패스워드가 일치하지 않습니다.',
      };
    }

    if (userByNickname) {
      return {
        status: 412,
        message: '중복된 닉네임입니다.',
      };
    }

    // 저장소에게 데이터 요청
    const signupUserData = await this.userRepository.signupUser(
      nickname,
      password
    );

    // 사용자에게 보여줄 데이터
    return {
      status: 201,
      message: '회원가입 되었습니다.',
      nickname: signupUserData.nickname,
    };
  };

  // 로그인
  doLogin = async (nickname, password) => {
    const userByNickname = await this.userRepository.findOneByNickname(
      nickname,
      password
    );

    if (!userByNickname || userByNickname.password !== password) {
      return {
        status: 412,
        message: '닉네임과 패스워드를 다시 확인해주세요.',
        token: null,
      };
    }

    const token = jwt.sign({}, secretKey.key);

    return { token, message: '로그인 되었습니다.' };
  };
}

module.exports = UserService;
