// Packages needed for this application
const inquirer = require('inquirer')
const fs = require('fs')
const generateMD = require('./utils/generateMarkdown')

// Array of questions for user input
const questions = [
    'What is your project title?',
    'Enter a brief description.',
    'Enter installation instructions',
    'Enter usage information',
    'Enter credits',
    'Enter test instructions',
    'Pick a license.',
    'Enter your GitHub username.',
    'Enter your email.'
];

// Function to write README file
function writeToFile(fileName, data) {
    inquirer
        .prompt([
            {
                type: 'input',
                message: questions[0],
                name: 'title',
            },
            {
                type: 'input',
                message: questions[1],
                name: 'description',
            },
            {
                type: 'input',
                message: questions[2],
                name: 'installation',
            },
            {
                type: 'input',
                message: questions[3],
                name: 'usage',
            },
            {
                type: 'input',
                message: questions[4],
                name: 'contribution',
            },
            {
                type: 'input',
                message: questions[5],
                name: 'test',
            },
            {
                type: 'rawlist',
                message: questions[6],
                name: 'license',
                choices: [
                    { value: 'Apache 2.0' },
                    { value: 'ISC' },
                    { value: 'MIT' },
                    { value: 'GNU GPLv3' },
                    { value: 'None' }
                ]
            },
            {
                type: 'input',
                message: questions[7],
                name: 'username',
            },
            {
                type: 'input',
                message: questions[8],
                name: 'email',
            }
        ])
        .then((response) => {
            // Switch statement for license list. Assigns license text and badge.
            switch (JSON.stringify(response.license)) {
                case '"Apache 2.0"':
                    var licenseInfo = generateMD.apache
                    var licenseBadge = generateMD.apacheBadge
                    break;
                case '"ISC"':
                    var licenseInfo = generateMD.isc
                    var licenseBadge = generateMD.iscBadge
                    break;
                case '"MIT"':
                    var licenseInfo = generateMD.mit
                    var licenseBadge = generateMD.mitBadge
                    break;
                case '"GNU GPLv3"':
                    var licenseInfo = generateMD.gnu
                    var licenseBadge = generateMD.gnuBadge
                    break;

                default:
                    var licenseInfo = ``
                    var licenseBadge = ``
                    break;
            }
            // Skeleton of README assigned to variable in template literal
            const skeleton = `# ${response.title}
${licenseBadge}

## Description
${response.description}

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [Testing](#testing)
* [Questions](#questions)

## Installation
${response.installation}

## Usage
${response.usage}

## Credits
${response.contribution}

## Testing
${response.test}

## License
${licenseInfo}

## Questions
Have any questions? Feel free to reach out.

GitHub: [${response.username}](https://github.com/${response.username})

Email: [${response.email}](mailto:${response.email})`
            // writeFile function to generate README
            fs.writeFile('README.md',
                skeleton,
                (err) => err ? console.error(err) : console.log('Success!')
            )
        }
        );
}

// Function to initialize app
function init() {
    console.log('Welcome to the README generator!');
    writeToFile();
}

// Function call to initialize app
init();







