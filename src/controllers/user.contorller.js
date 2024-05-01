const db = require("../model/data.js");

/**
 * user 로그인 API : POST
 * @param {Request} req
 * @param {Response} res
 * @returns {Response}
 */
const loginUser = (req, res) => {
  const { id, pwd } = req.body;
  console.log(typeof pwd);
  const validReq = validRequest([id, pwd]);
  const idExist = db.get(id);

  // 계정정보를 올바르게 입력 안했을때
  if (!validReq) {
    res.status(400).send("올바른 로그인 정보를 입력해주세요");
    return;
  }

  // db가 비어있거나, 일치하는 id 가 없을 때
  if (db.size === 0 || !idExist) {
    res.status(404).send("해당 ID가 존재하지 않습니다.");
    return;
  }

  // ID 존재 상황
  if (idExist) {
    const dbUser = db.get(id);
    console.log(dbUser);
    if (dbUser && dbUser.pwd === pwd) {
      res.status(200).send(`${id} : ${dbUser.name} 님 로그인을 환영합니다.`);
    } else {
      res.status(400).send("비밀번호가 일치하지 않습니다.");
    }
  }
};

/**
 * user 회원 가입 API : POST
 * @param {Request} req
 * @param {Response} res
 * @returns {Response}
 */
const signupUser = (req, res) => {
  const { id, pwd, name } = req.body;
  const validReq = validRequest([id, pwd, name]);

  if (!validReq) {
    res.status(400).send("올바른 가입정보를 입력하세요");
    return;
  }

  const existId = db.get(id);
  if (existId) {
    res.status(400).send(`이미 존재하는 아이디 입니다. : ${id}`);
    return;
  } else {
    const newUser = {
      pwd,
      name,
    };
    db.set(id, newUser);
    res.status(200).json({ id, ...newUser, message: "회원가입 완료" });
  }
};

module.exports = {
  loginUser,
  signupUser,
};

function validRequest() {
  for (const item of [...arguments]) {
    if (typeof item === "undefined") {
      return false;
    }
  }

  return true;
}
