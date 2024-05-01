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

/**
 * 회원 개별 조회 API : GET
 * @param {Request} req
 * @param {Response} res
 */
const getUser = (req, res) => {
  const { id } = req.params;
  const dbUser = db.get(id);
  const validReq = validRequest([id]);

  if (!validReq) {
    res.status(400).send("올바른 회원 id를 입력해주세요");
    return;
  }

  //db에 회원 id가 없는 경우
  if (!dbUser) {
    res.status(404).send(`${id} 회원이 존재하지 않습니다.`);
    return;
  }

  const user = {
    id,
    pwd: dbUser.pwd,
    name: dbUser.name,
  };
  res.status(200).json(user);
};

/**
 * 개별 회원 탈퇴 API : DELETE
 * @param {Request} req
 * @param {Response} res
 */
const deleteUser = (req, res) => {
  const { id } = req.params;
  const validReq = validRequest([id]);
  if (!validReq) {
    res.status(400).send("올바른 id를 입력해주세요");
  }

  const dbUser = db.get(id);

  // 올바른 user 존재 시 삭제
  if (dbUser) {
    const userDeleteState = db.delete(id);
    if (userDeleteState) {
      res.status(200).send(`${id} 회원이 정상적으로 탈퇴 되었습니다.`);
    } else {
      res.status(505).send(`${id}의 탈퇴가 이루어지지 않았습니다.`);
    }
  }
};

module.exports = {
  loginUser,
  signupUser,
  getUser,
  deleteUser,
};

function validRequest() {
  for (const item of [...arguments]) {
    if (typeof item === "undefined") {
      return false;
    }
  }

  return true;
}
