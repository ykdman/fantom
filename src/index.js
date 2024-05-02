const express = require("express");
const app = express();
const PORT = 3000;

// controllers
const userControllers = require("./controllers/user.contorller.js");

// Router
const pagesRouter = require("./routes/page.router.js");

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

// 개별 회원 정보 조회 Route
app.get("/users/:id", userControllers.getUser);

// 개별 회원 탈퇴 (삭제) Route
app.delete("/users/:id", userControllers.deleteUser);
