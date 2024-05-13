const db = require("../model/data.js");
const utilFn = require("../utils/validRequest.js");
const connection = require("../model/dbConnect.js");
const { validationResult } = require("express-validator");

/**
 * user 로그인 API : POST
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const loginUser = (req, res) => {
  const { email, pwd } = req.body;
  let sql = `
    SELECT * FROM users 
    WHERE email = '${email}'`;
  connection.query(sql, (err, result) => {
    if (err) console.log(err.name, err.message);
    else {
      if (result[0] && result[0].pwd === pwd) {
        res.status(201).json({ message: `${email} 님 로그인 되었습니다.` });
      } else if (!result[0]) {
        res
          .status(404)
          .json({ message: `${email} 회원 정보를 찾지 못했습니다.` });
      } else if (result[0].pwd !== pwd) {
        res.status(400).json({ message: "비밀번호가 일치하지 않습니다." });
      }
    }
  });

  // const validReq = utilFn.validRequest([id, pwd]);
  // const idExist = db.get(id);

  // // 계정정보를 올바르게 입력 안했을때
  // if (!validReq) {
  //   res.status(400).send("올바른 로그인 정보를 입력해주세요");
  //   return;
  // }

  // // db가 비어있거나, 일치하는 id 가 없을 때
  // if (db.size === 0 || !idExist) {
  //   res.status(404).send("해당 ID가 존재하지 않습니다.");
  //   return;
  // }

  // // ID 존재 상황
  // if (idExist) {
  //   const dbUser = db.get(id);
  //   console.log(dbUser);
  //   if (dbUser && dbUser.pwd === pwd) {
  //     res.status(200).send(`${id} : ${dbUser.name} 님 로그인을 환영합니다.`);
  //   } else {
  //     res.status(400).send("비밀번호가 일치하지 않습니다.");
  //   }
  // }
};

/**
 * user 회원 가입 API : POST
 * @param {Request} req
 * @param {Response} res
 * @returns {Response}
 */
const signupUser = (req, res) => {
  const { email, pwd, name } = req.body;
  console.log(req.body);
  let sql = `SELECT * FROM fantom.users
  WHERE email = '${email}'`;

  const validReq = utilFn.validRequest([email, pwd, name]);

  if (!validReq) {
    res.status(400).send("올바른 가입정보를 입력하세요");
  }

  //회원 가입 QUERY
  connection.query(sql, (err, result) => {
    if (err) console.log(err.name, err.message);
    else {
      if (!result[0]) {
        // 정상 회원가입 (중복 email 없음)
        let sql = `INSERT INTO users 
        (email, name, pwd) 
        VALUES 
        (?, ? ,?)`;
        connection.query(sql, [email, pwd, name], (err, result) => {
          if (err) console.log(err.name, err.message);
          else {
            res.status(201).json({ message: `${name} 님 가입을 환영합니다!` });
          }
        });
      } else {
        res.status(400).json({ message: "이미 존재하는 계정입니다." });
      }
    }
  });

  // const existId = db.get(email);
  // if (existId) {
  //   res.status(400).send(`이미 존재하는 아이디 입니다. : ${email}`);
  //   return;
  // } else {
  //   const newUser = {
  //     pwd,
  //     name,
  //   };
  //   db.set(email, newUser);
  //   res.status(200).json({ id: email, ...newUser, message: "회원가입 완료" });
  // }
};

/**
 * 회원 개별 조회 API : GET
 * @param {Request} req
 * @param {Response} res
 */
const getUser = (req, res) => {
  const err = validationResult(req);
  console.log(err.array());
  const { email } = req.params;
  console.log(email);
  let sql = `SELECT * FROM users
  WHERE email = ?`;

  connection.query(sql, email, (err, results, fields) => {
    console.log(results);
    if (err) console.log(err.name, err.message);
    else {
      if (results[0]) {
        res.status(200).json(results[0]);
      } else {
        res.status(404).json({ message: "회원 정보를 찾을 수 없습니다." });
      }
    }
  });

  // const validReq = utilFn.validRequest([id]);

  // if (!validReq) {
  //   res.status(400).send("올바른 회원 id를 입력해주세요");
  //   return;
  // }

  // //db에 회원 id가 없는 경우
  // if (!dbUser) {
  //   res.status(404).send(`${id} 회원이 존재하지 않습니다.`);
  //   return;
  // }

  // const user = {
  //   id,
  //   pwd: dbUser.pwd,
  //   name: dbUser.name,
  // };
  // res.status(200).json(user);
};

/**
 * 개별 회원 탈퇴 API : DELETE
 * @param {Request} req
 * @param {Response} res
 */
const deleteUser = (req, res) => {
  const { email } = req.params;
  const validReq = validRequest([email]);
  if (!validReq) {
    res.status(400).send("올바른 id를 입력해주세요");
  }

  let sql = `DELETE FROM users
    WHERE email = ?
  `;
  connection.query(sql, email, (err, result) => {
    if (err) console.log(err.name, err.message);
    else {
      res.status(200).json({ message: "회원탈퇴가 완료 되었습니다." });
    }
  });

  // const dbUser = db.get(email);

  // // 올바른 user 존재 시 삭제
  // if (dbUser) {
  //   const userDeleteState = db.delete(email);
  //   if (userDeleteState) {
  //     res.status(200).send(`${email} 회원이 정상적으로 탈퇴 되었습니다.`);
  //   } else {
  //     res.status(505).send(`${email}의 탈퇴가 이루어지지 않았습니다.`);
  //   }
  // }
};

module.exports = {
  loginUser,
  signupUser,
  getUser,
  deleteUser,
};
