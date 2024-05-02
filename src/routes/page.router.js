// routes/page.router.js

const express = require("express");

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
  .post(pagesController.createPage);

// /pages/:id 라우터
// get
// post
pagesRouter
  .route("/:id")
  .get(pagesController.getOnePage)
  .put(pagesController.updatePage)
  .delete(pagesController.deletePage);

module.exports = pagesRouter;
