/* eslint-disable */
const fs = require("fs");
const path = require("path");

const getDirectories = source => {
  return fs.readdirSync(source)
    .filter(name => fs.lstatSync(path.join(source, name)).isDirectory());
};

module.exports = {
  prompt: ({ prompter }) => {
    
    const prompts = [
      {
        type: 'input',
        name: 'fileName',
        message: "What's your component name?"
      },
      {
        type: 'select',
        name: 'selectedDomain',
        message: "Select a domain:",
        choices: getDirectories(path.resolve(__dirname, "../../../resources/js/domains"))      
      }
    ]
    
    return prompter
      .prompt(prompts)
      .then((answers) => answers)
  }
};
