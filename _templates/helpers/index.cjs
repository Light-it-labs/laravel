/* eslint-disable */
const fs = require("fs");
const path = require("path");

module.exports = {
  getDomainFolderNames: () => {
    const source = path.resolve(__dirname, "../../resources/js/domains")
    return fs
      .readdirSync(source)
      .filter(name => fs.lstatSync(path.join(source, name))
      .isDirectory()
    );
  }
}
