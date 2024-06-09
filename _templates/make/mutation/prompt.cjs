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
        message: "What's your mutation file name?",
        validate: (input) => {
          if (!input.startsWith("use")) return 'File name must start with "use"'
          if (!input.endsWith("Mutation")) return 'File name must end with "Mutation"'
          return true
        }
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
