const express = require("express");
// validator library
const { check, validationResult } = require("express-validator");
const app = express();
const PORT = 3000;

// controllers
const userControllers = require("./controllers/user.contorller.js");

// Router
const pagesRouter = require("./routes/page.router.js");
const { validRequest } = require("./utils/validRequest.js");

app.listen(PORT, () => {
  console.log(`server listen : ${PORT}`);
});

// body Parser
app.use(express.json());

// middlw Ware (logger)
app.use((req, res, next) => {
  const start = Date.now();
  console.log(`start: ${req.method} ${req.url}`);
  next(); // router 실행
  const diffTime = Date.now() - start;
  console.log(`end: ${req.method} ${req.baseUrl}${req.url} ${diffTime}ms`);
});

// pages 라우터
app.use("/pages", pagesRouter);

// 회원가입 Route
app.post("/signup", userControllers.signupUser);

// 로그인 Route
app.post("/login", userControllers.loginUser);

app
  .route("/users/:email")
  // 개별 회원 정보 조회 Route
  // 개별 회원 탈퇴 (삭제) Route
  .get(
    [check("email").isEmail().withMessage("이메일 주소를 입력해주세요.")],
    userControllers.getUser
  )
  .delete(userControllers.deleteUser);

// app.use((req, res, next) => {
//   console.log("미들웨어!");
//   const error = validationResult(req);
//   if (!error.isEmpty()) {
//     return res.status(400).json(error.array());
//   }
// });
