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
  database: "EMPLOYEE_TRACKER"
});








connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  connection.end();
});