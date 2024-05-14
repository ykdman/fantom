const express = require("express");
// validator library
const { body, check, validationResult } = require("express-validator");
const app = express();
const PORT = 3000;

// controllers
const userControllers = require("./controllers/user.contorller.js");

// Router
const pagesRouter = require("./routes/page.router.js");

// validator
const { validator } = require("./utils/validator");

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
app.post(
  "/login",
  [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("이메일을 입력해주세요")
      .isEmail()
      .withMessage("이메일을 올바르게 입력해주세요"),
    body("pwd")
      .trim()
      .notEmpty()
      .withMessage("비밀번호를 입력해주세요")
      .isString()
      .withMessage("올바른 비밀번호를 입력해주세요"),
    validator,
  ],
  userControllers.loginUser
);

app
  .route("/users/:email")
  // 개별 회원 정보 조회 Route
  // 개별 회원 탈퇴 (삭제) Route
  .get(
    [
      check("email").isEmail().withMessage("이메일 주소를 입력해주세요."),
      validator,
    ],
    userControllers.getUser
  )
  .delete(userControllers.deleteUser);
