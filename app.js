const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

const routes = require('./routes/index.js');

app.use(express.json());
app.use(cookieParser());
app.use('/api', routes);

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요.');
});
