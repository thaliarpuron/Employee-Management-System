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
    "Add department",
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
    } if (response.choice == options[3]) {
      addEmployee();
    } if (response.choice == options[4]) {
      addDepartment();
    } if (response.choice == options[5]) {
      addRole();
    }
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

function addEmployee() {
  const roles = [1, 2, 3, 4];
  inquirer.prompt([
    {
      type: "input",
      message: "Enter the employee's first name",
      name: "firstName",
    },
    {
      type: "input",
      message: "Enter the employee's last name",
      name: "lastName",
    },
    {
      type: "list",
      message:
        "Select the employee's role (Manager = 1 || Call Center Agent = 2 || Referral Coordinator = 3 || Accountant = 4)",
      choices: roles,
      name: "role",
    },
    {
      type: "confirm",
      message: "Is this employee a Manager?",
      name: "manager",
    },
  ]).then((response) => {
    let manager;
    if (response.manager === true) {
      manager = 1;
    } else {
      manager = null;
    }

    connection.query("INSERT INTO EMPLOYEE (FIRST_NAME, LAST_NAME, ROLE_ID, MANAGER_ID) VALUES (?, ?, ?, ?);", [response.firstName, response.lastName, parseInt(response.role), manager],
      function (error, result) {
        if (error) {
          console.log(error);
        }
        connection.query("SELECT * FROM EMPLOYEE WHERE ID=?;", [result.insertId], function (error, result) {
          if (error) {
            console.log(error);
          }
          console.table(result);
          start();
        });
      });
  });
}

function addDepartment() {
  inquirer.prompt([
    {
      type: "input",
      message: "What is the name of the department you want to add?",
      name: "departmentName",
    },
  ]).then((response) => {
    let department = response.departmentName;
    department = department.toUpperCase();

    connection.query(
      "INSERT INTO department (name) VALUES (?);", [department], function (error, result) {
        if (error) {
          console.log(error);
        } else {
          connection.query(
            "SELECT * FROM department WHERE id=?;", [result.insertId], function (error, result) {
              if (error) {
                console.log(error);
              }
              console.table(result);
            });
        }
        start();
      });
  });
}

function addRole() {
  inquirer.prompt([
    {
      type: "input",
      message: "What role you want to add?",
      name: "roleTitle",
    },
    {
      type: "input",
      message: "What is the salary for this role?",
      name: "roleSalary",
    },
  ]).then((response1) => {
    connection.query("SELECT * FROM department;", function (error, result) {
      if (error) {
        console.log(error);
      }
      console.table(result);
    });
    newRole(function () {
      inquirer.prompt([
        {
          type: "input",
          message: "What is the department ID for this role?",
          name: "departmentID",
        },
      ]).then((response) => {
        let role = response1.roleTitle;
        role = role.toUpperCase();
        let salary = response1.roleSalary;
        let departmentID = response.departmentID;

        connection.query("INSERT INTO role (role_title, role_salary, department_id) VALUES (?, ?, ?);", [role, salary, departmentID],
          function (error, result) {
            if (error) {
              console.log(error);
            } else {
              connection.query("SELECT * FROM role WHERE id=?;", [result.insertId], function (error, result) {
                if (error) {
                  console.log(error);
                }
                console.table(result);
              });
            }
            newRole(function () {
              beggining();
            });
          });
      });
    });
  });
}