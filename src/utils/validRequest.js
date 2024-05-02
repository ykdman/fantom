function validRequest() {
  for (const item of [...arguments]) {
    if (typeof item === "undefined") {
      return false;
    }
  }

  return true;
}

module.exports = {
  validRequest,
};
