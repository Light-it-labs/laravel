/* eslint-disable */
const { getDomainFolderNames } = require("../../helpers/index.cjs")

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
        choices: getDomainFolderNames()
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
