const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// --Const functions 

//empty array that will store the team members information; Name, ID and Email, Gituhub & office numbers
const mainArray = [];

// START: questions for different teams members:

// Manager Q's: 
const managerQuestions = [

    {
        type: 'input',
        name: 'managementName',
        message: 'Please enter the name of the manager of this team, or your name if you are the manager of this team '
    },

    {
        type: 'input',
        name: 'managementID',
        message: 'What is this managers ID number, enter your ID number if you are the manager of this team'
    },

    {
        type: 'input',
        name: 'managementEmail',
        message: 'What is this managers Email address, enter your email address if you are the manager of this team'
    },

    {
        type: 'input',
        name: 'office',
        message: 'What is this managers office number? if you are the manager of this team, enter your office number'
    },
]

//Engineer Q's: 
const engineerQuestions = [

    {
        type: 'input',
        name: 'engineerName',
        message: 'Enter the name of this engineer'
    },

    {
        type: 'input',
        name: 'engineerID',
        message: 'Enter the ID number for this engineer'
    },

    {
        type: 'input',
        name: 'engineerEmail',
        message: 'Enter the email address for this engineer'
    },

    {
        type: 'input',
        name: 'github',
        message: 'Enter this engineers GitHub user name'
    },
]

//Intern Q's:
const internQuestions = [

    {
        type: 'input',
        name: 'internName',
        message: 'Enter the name of this intern'
    },

    {
        type: 'input',
        name: 'internID',
        message: 'Enter the ID number for this intern'
    },

    {
        type: 'input',
        name: 'internEmail',
        message: 'Enter the email address for this intern'
    },

    {
        type: 'input',
        name: 'school',
        message: 'What school does this interen attend, if this intern is not currently attending a school enter "N/A" '
    },
]

//LAST: question will prompt the user if they want to add another employee or finish the profile

const listGen = [
    {
        type: 'list',
        name: 'nextEmployee',
        message: 'Select the type of team member you would like to add next, if you are done select "Done" to generate your team ',
        choices: ['Manager', 'Engineer', 'Intern', 'Done']
    }
]
//END: of questions 


//START: of functions - 
function init() {
    //starts with the manager function
    managerPrompt();
}


//this function will prompt the user to select the next type of employee they are adding 
function next() {
    inquirer.prompt(listGen).then((response) => {

        console.log(response);
        switch (response.nextEmployee) {
            case 'Manager':
                managerPrompt();
                break;
            case 'Engineer':
                engineerPrompts();
                break;
            case 'Intern':
                internPrompts();
                break;
            case 'Done':
                console.log('Creating your team!')
                createTeam();
        }
    })
}
//Function for Manager; prompt & questions that will be called first when running
function managerPrompt() {
    inquirer.prompt(managerQuestions).then((response) => {

        let name = response.managementName;
        let id = response.managementID;
        let email = response.managementEmail;
        let office = response.office;

        // creates an object for this manager 
        const manager = new Manager(name, id, email, office);

        //pushes the new manager objects to the empty array 
        mainArray.push(manager);

        //this will call the next function to lead the user to select the next type of employee to add
        console.log(mainArray);
        next();
    })
}
//Function for Engineer; prompt & questions
function engineerPrompts() {
    inquirer.prompt(engineerQuestions).then((response) => {

        let name = response.engineerName;
        let id = response.engineerID;
        let email = response.engineerEmail;
        let github = response.github;

        // creates an object for this engineer 
        const engineer = new Engineer(name, id, email, github);

        //pushes the new engineer objects to the empty array 
        mainArray.push(engineer);

        //this will call the next function which will promt the user to select the next type of employee they are adding
        console.log(mainArray);
        next();
    })
}

//Function for Intern; prompt & questions
function internPrompts() {
    inquirer.prompt(internQuestions).then((response) => {

        let name = response.internName;
        let id = response.internID;
        let email = response.internEmail;
        let school = response.school;

        // creates an object for this intern
        const intern = new Intern(name, id, email, school);

        //pushes the new intern objects to the empty array 
        mainArray.push(intern);

        //this will call the next function which will promt the user to select the next type of employee they are adding 
        console.log(mainArray);
        next();
    })
}
//function to create the complete file 
function createTeam() {
    fs.writeFile(outputPath, render(mainArray), function (err) {
        if (err) {
            return console.log(err)
        }
    })
}
//calls to initiate function 
init();