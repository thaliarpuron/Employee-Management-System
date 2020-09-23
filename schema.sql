--Drop database if exists-- 
DROP DATABASE IF EXISTS EMPLOYEE_TRACKER;

--Create database--
CREATE DATABASE EMPLOYEE_TRACKER;

--Use database--
USE EMPLOYEE_TRACKER;

--Create department table--
CREATE TABLE IF NOT EXISTS `EMPLOYEE_TRACKER`.`department` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`id`)
  );

--Create role table--
CREATE TABLE IF NOT EXISTS `EMPLOYEE_TRACKER`.`role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(30) NOT NULL,
  `salary` DECIMAL NOT NULL,
  `department_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_role_department1_idx` (`department_id` ASC) VISIBLE,
  CONSTRAINT `fk_role_department1`
    FOREIGN KEY (`department_id`)
    REFERENCES `EMPLOYEE_TRACKER`.`department` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
    );

--Create employee table--    
CREATE TABLE IF NOT EXISTS `EMPLOYEE_TRACKER`.`employee` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(30) NOT NULL,
  `last_name` VARCHAR(30) NOT NULL,
  `role_id` INT NOT NULL,
  `manager_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_employee_role_idx` (`role_id` ASC) VISIBLE,
  INDEX `fk_employee_employee1_idx` (`manager_id` ASC) VISIBLE,
  CONSTRAINT `fk_employee_role`
    FOREIGN KEY (`role_id`)
    REFERENCES `EMPLOYEE_TRACKER`.`role` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_employee_employee1`
    FOREIGN KEY (`manager_id`)
    REFERENCES `EMPLOYEE_TRACKER`.`employee` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
    );
    