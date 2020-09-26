USE EMPLOYEE_TRACKER;

INSERT INTO department (name) VALUES ("Management");
INSERT INTO department (name) VALUES ("Call Center");
INSERT INTO department (name) VALUES ("Referrals");
INSERT INTO department (name) VALUES ("Accounting");

INSERT INTO role (title, salary, department_id) VALUES ("Manager", 100000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Call Center Agent",25000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Referral Coordinator", 25000, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Accountant", 50000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Marlow", "Hernandez", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Thalia", "Rodriguez", 2, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Cherilyn", "Smith", 3, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Alex", "Ramos", 4, NULL);
