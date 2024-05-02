const pageData = require("../model/pagesData.js");

/**
 * pages 전체 조회 API
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const getPages = (req, res) => {
  const pages = [];
  [...pageData.keys()].forEach((key) => {
    const page = {
      id: key,
      pageName: pageData.get(key).pageName,
      artistName: pageData.get(key).artistName,
    };
    pages.push(page);
  });
  res.status(200).json(pages);
};

/**
 * 페이지 생성 API : POST | '/pages/'
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const createPage = (req, res) => {
  const { artistName, pageName, id } = req.body;
  const pageExist = pageData.has(id);

  if (!pageExist) {
    pageData.set(id, { artistName, pageName });
    res
      .status(200)
      .json({ id, artistName, pageName, message: `페이지 생성 완료 : ${id}` });
  } else {
    res.status(400).json({ message: "이미 존재하는 페이지 입니다." });
  }
};

/**
 * 한 페이지 조회 API : GET | '/pages/:id'
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const getOnePage = (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const page = pageData.get(id);

  if (!page) {
    res.status(404).json({ message: "페이지를 찾을 수 없습니다." });
  } else {
    const pageInfo = { id, ...page };
    res.status(200).json(pageInfo);
  }
};

/**
 * 페이지 정보 수정 API : PUT | '/pages/:id'
 * @param {import("express").Request}} req
 * @param {import("express").Response} res
 * @returns
 */
const updatePage = (req, res) => {
  const { id } = req.params;
  const { artistName, pageName } = req.body;
  const existPage = pageData.get(id);
  if (!artistName || !pageName) {
    res.status(400).send("올바른 정보를 입력해주세요.");
    return;
  }
  if (!existPage) {
    res.status(404).send("수정하려는 페이지를 찾을 수 없습니다.");
    return;
  }

  pageData.set(id, { artistName, pageName });
  res.status(200).json({
    message: "페이지 정보가 수정되었습니다.",
    id,
    artistName,
    pageName,
  });
};

/**
 * 페이지 삭제 API : DELETE | '/pages/:id'
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const deletePage = (req, res) => {
  const { id } = req.params;
  const existPage = pageData.get(id);

  if (!existPage) {
    res.status(404).json({ message: "삭제할 페이지를 찾을 수 없습니다." });

    return;
  }

  pageData.delete(id);
  res
    .status(200)
    .json({ message: "페이지를 삭제하였습니다.", pageId: existPage.id });
};

module.exports = {
  getPages,
  createPage,
  getOnePage,
  updatePage,
  deletePage,
};
