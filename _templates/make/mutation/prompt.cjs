/* eslint-disable */
const { getDomainFolderNames } = require("../../helpers/index.cjs")

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
        choices: getDomainFolderNames()
      }
    ]
    
    return prompter
      .prompt(prompts)
      .then((answers) => answers)
  }
};
