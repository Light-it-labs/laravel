/* eslint-disable */
const path = require("path");
const { getDomainFolderNames } = require("../../helpers/index.cjs")

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
        choices: getDomainFolderNames() 
      }
    ]
    
    return prompter
      .prompt(prompts)
      .then((answers) => answers)
  }
};
