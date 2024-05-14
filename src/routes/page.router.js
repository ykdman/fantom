// routes/page.router.js

const express = require("express");
const { body, check } = require("express-validator");

const { validator } = require("../utils/validator.js");

const pagesRouter = express.Router();
const pagesController = require("../controllers/pages.controller.js");
/**
 * /pages 라우터
 * - get : pages 전체 정보 조회
 * - post : pages 생성
 */
pagesRouter
  .route("/")
  .get(pagesController.getPages)
  .post(
    [
      body("artist_id")
        .trim()
        .isString()
        .withMessage("아티스트 이름을 문자열로 입력하세요"),

      body("user_id").isInt().withMessage("user_id를 숫자형으로 입력해주세요."),
      validator,
    ],
    pagesController.createPage
  );

// /pages/:id 라우터
// get
// post
pagesRouter
  .route("/:id")
  .get(
    [
      check("id").isNumeric().withMessage("올바른 페이지 id를 작성해주세요"),
      validator,
    ],
    pagesController.getOnePage
  )
  .put(pagesController.updatePage)
  .delete(pagesController.deletePage);

module.exports = pagesRouter;
