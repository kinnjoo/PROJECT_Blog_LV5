const UserRepository = require('../repositories/users.repository.js');

class UserService {
  userRepository = new UserRepository();

  signupUser = async (nickname, password, confirmPassword) => {
    try {
      // 닉네임 : 알파벳 대소문자, 숫자, 3자 이상 10자 이하
      const checkNickname = /^[a-zA-Z0-9]{3,10}$/;

      // 닉네임, 비밀번호 형식 체크 : 중복 닉네임 추가해야함
      if (!nickname || !password || !confirmPassword) {
        const err = new Error('모든 항목을 입력해주셔야 합니다.');
        err.statusCode = 400;
        throw err;
      } else if (!checkNickname.test(nickname)) {
        const err = new Error('닉네임의 형식이 올바르지 않습니다.');
        err.statusCode = 412;
        throw err;
      }

      if (password.length < 4 || password.includes(nickname)) {
        const err = new Error(
          '패스워드는 4글자 이상이어야 하며 닉네임을 포함할 수 없습니다.'
        );
        err.statusCode = 412;
        throw err;
      } else if (password !== confirmPassword) {
        const err = new Error('패스워드가 일치하지 않습니다.');
        err.statusCode = 412;
        throw err;
      }

      // 저장소에게 데이터 요청
      const signupUserData = await this.userRepository.signupUser(
        nickname,
        password
      );

      // 사용자에게 보여줄 데이터
      return {
        nickname: signupUserData.nickname,
      };
    } catch (error) {
      console.error(error);
    }
  };
}

module.exports = UserService;
