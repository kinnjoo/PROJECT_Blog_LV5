const jwt = require('jsonwebtoken');
const secretKey = require('../config/secretKey.json');

authMiddleware = async (req, res, next) => {
  try {
    const { Authorization } = req.cookies;

    const [authType, authToken] = (Authorization ?? '').split(' ');

    if (authType !== 'Bearer' || !authToken) {
      return res
        .status(403)
        .json({ errorMessage: '로그인이 필요한 기능입니다.' });
    }
    const decodedToken = jwt.verify(authToken, secretKey.key);

    const userId = decodedToken.userId;
    res.locals.userId = userId;

    next();
  } catch (error) {
    console.error(error);
    res
      .status(403)
      .json({ errorMessage: '전달된 쿠키에서 오류가 발생하였습니다.' });
  }
};

module.exports = authMiddleware;
