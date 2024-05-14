const { validationResult } = require("express-validator");

/**
 * 유효성 검사 validator 함수
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 * @returns
 */
const validator = (req, res, next) => {
  console.log("유효성 검사 진행");
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json(error.array());
  } else {
    console.log("다음 로직 수행");
    return next();
  }
};

module.exports = {
  validator,
};
