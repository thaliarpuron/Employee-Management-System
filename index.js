// Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

// Create connection
var connection = mysql.createConnection({
  host: "localhost",

  // Your port
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "employee_tracker"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  start();
});


function start() {
  const options = [
    "View all employees",
    "View all employees by role",
    "View all employees by manager",
    "Add employee",

    //"Add department",
    //"Update employee role.",
    //"Remove employee",
    //"Exit.",
  ];
  inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do?",
      choices: options,
      name: "choice"
    }
  ]).then(response => {
    if (response.choice == options[0]) {
      allEmployees();
    } if (response.choice == options[1]) {
      employeesByRole();
    } if (response.choice == options[2]) {
      employeesByManager();
  });
};

function allEmployees() {
  connection.query("SELECT * employee_tracker.employee;", function (error, result) {
    if (error, result) {
      console.log(error);
    }
    console.table(result);
    start();
  });
}

function employeesByRole() {
  connection.query("SELECT employee.first_name,employee.last_name,role.title FROM employee INNER JOIN role ON role.id=employee.role_id;",
    function (error, result) {
      if (error) {
        console.log(error);
      }
      console.table(result);
      start();
    });
}

function employeesByManager() {
  connection.query("SELECT * FROM employee WHERE manager_id=1", function (error, result) {
    if (error, result) {
      console.log(error);
    }
    console.table(result);
    start();
  });
}




