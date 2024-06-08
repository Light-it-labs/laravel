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
        message: "What's your form name?",
      },
      {
        type: 'select',
        name: 'selectedDomain',
        message: "Select a domain:",
        choices: getDirectories(path.resolve(__dirname, "../../../resources/js/domains"))      
      },
      {
        type: 'input',
        name: 'fields',
        message: 'Enter a comma separated list of fields:',
        validate: (input) => input.trim() === '' ? 'Please provide at least one field.' : true
      }
    ]
    
    return prompter
      .prompt(prompts)
      .then((answers) => answers)
  }
};
