-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema rest-resume-api
-- -----------------------------------------------------
DROP database `rest-resume-api`;
-- -----------------------------------------------------
-- Schema rest-resume-api
-- -----------------------------------------------------
CREATE DATABASE IF NOT EXISTS `rest-resume-api` DEFAULT CHARACTER SET utf8 ;
USE `rest-resume-api` ;

-- -----------------------------------------------------
-- Table `rest-resume-api`.`role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rest-resume-api`.`role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `role` VARCHAR(45) NOT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `idrole_UNIQUE` (`id` ASC),
  UNIQUE INDEX `rolecol_UNIQUE` (`role` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `rest-resume-api`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rest-resume-api`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(50) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `firstName` VARCHAR(50) NOT NULL,
  `secondName` VARCHAR(50) NULL,
  `lastName` VARCHAR(50) NOT NULL,
  `secondLastName` VARCHAR(50) NULL,
  `active` TINYINT(1) NOT NULL DEFAULT 0,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `idRole` INT NOT NULL,
  PRIMARY KEY (`id`, `idRole`),
  UNIQUE INDEX `username_UNIQUE` (`email` ASC),
  INDEX `fk_users_role1_idx` (`idRole` ASC),
  CONSTRAINT `fk_users_role1`
    FOREIGN KEY (`idRole`)
    REFERENCES `rest-resume-api`.`role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `rest-resume-api`.`education`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rest-resume-api`.`education` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `institution` VARCHAR(150) NOT NULL,
  `subject` VARCHAR(100) NOT NULL,
  `startDate` DATE NOT NULL,
  `endDate` DATE NOT NULL,
  `isCurrent` TINYINT(1) NOT NULL,
  `idUsers` INT NOT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `ideducation_UNIQUE` (`id` ASC),
  INDEX `fk_education_users1_idx` (`idUsers` ASC),
  CONSTRAINT `fk_education_users1`
    FOREIGN KEY (`idUsers`)
    REFERENCES `rest-resume-api`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `rest-resume-api`.`experience`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rest-resume-api`.`experience` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `company` VARCHAR(50) NOT NULL,
  `role` VARCHAR(50) NOT NULL,
  `project` VARCHAR(50) NOT NULL,
  `startDate` DATE NOT NULL,
  `endDate` DATE NOT NULL,
  `isCurrent` TINYINT(1) NOT NULL,
  `directBoss` VARCHAR(100) NOT NULL,
  `bossEmail` VARCHAR(60) NOT NULL,
  `bossPhone` VARCHAR(45) NOT NULL,
  `shouldDyspayBossInfo` TINYINT(1) NOT NULL DEFAULT 0,
  `idUsers` INT NOT NULL,
  `createdAt` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `idexperience_UNIQUE` (`id` ASC),
  INDEX `fk_experience_users1_idx` (`idUsers` ASC),
  CONSTRAINT `fk_experience_users1`
    FOREIGN KEY (`idUsers`)
    REFERENCES `rest-resume-api`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `rest-resume-api`.`social_media`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rest-resume-api`.`social_media` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `url` VARCHAR(250) NOT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `idUsers` INT NOT NULL,
  PRIMARY KEY (`id`, `idUsers`),
  UNIQUE INDEX `idsocialMedia_UNIQUE` (`id` ASC),
  INDEX `fk_social_media_users1_idx` (`idUsers` ASC),
  CONSTRAINT `fk_social_media_users1`
    FOREIGN KEY (`idUsers`)
    REFERENCES `rest-resume-api`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `rest-resume-api`.`information`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rest-resume-api`.`information` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `phone` VARCHAR(45) NOT NULL,
  `city` VARCHAR(60) NOT NULL,
  `travel` TINYINT(1) NOT NULL,
  `birth` DATE NOT NULL,
  `car` TINYINT(1) NOT NULL,
  `married` TINYINT(1) NOT NULL,
  `bio` VARCHAR(250) NOT NULL,
  `users_idusers` INT NOT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_information_users1_idx` (`users_idusers` ASC),
  CONSTRAINT `fk_information_users1`
    FOREIGN KEY (`users_idusers`)
    REFERENCES `rest-resume-api`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `rest-resume-api`.`fieldsOfInterests`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rest-resume-api`.`fieldsOfInterests` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `role` VARCHAR(50) NOT NULL,
  `industry` VARCHAR(50) NOT NULL,
  `idUsers` INT NOT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`, `idUsers`),
  INDEX `fk_fieldsOfInterests_users1_idx` (`idUsers` ASC),
  CONSTRAINT `fk_fieldsOfInterests_users1`
    FOREIGN KEY (`idUsers`)
    REFERENCES `rest-resume-api`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `rest-resume-api`.`skills`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rest-resume-api`.`skills` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `skill` VARCHAR(100) NOT NULL,
  `percentage` SMALLINT NOT NULL,
  `years` SMALLINT NOT NULL,
  `idUsers` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_skills_users1_idx` (`idUsers` ASC),
  CONSTRAINT `fk_skills_users1`
    FOREIGN KEY (`idUsers`)
    REFERENCES `rest-resume-api`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `rest-resume-api`.`user_has_followers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rest-resume-api`.`user_has_followers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idFollowed` INT NOT NULL,
  `idFollower` INT NOT NULL,
  `startsFollogin` TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (`id`, `idFollowed`, `idFollower`),
  INDEX `fk_users_has_users_users2_idx` (`idFollower` ASC),
  INDEX `fk_users_has_users_users1_idx` (`idFollowed` ASC),
  CONSTRAINT `fk_users_has_users_users1`
    FOREIGN KEY (`idFollowed`)
    REFERENCES `rest-resume-api`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_has_users_users2`
    FOREIGN KEY (`idFollower`)
    REFERENCES `rest-resume-api`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `rest-resume-api` ;

-- -----------------------------------------------------
-- Placeholder table for view `rest-resume-api`.`v_getRoles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rest-resume-api`.`v_getRoles` (`id` INT, `role` INT);

-- -----------------------------------------------------
-- Placeholder table for view `rest-resume-api`.`v_userByEmail`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rest-resume-api`.`v_userByEmail` (`id` INT, `email` INT, `firstName` INT, `lastName` INT);

-- -----------------------------------------------------
-- Placeholder table for view `rest-resume-api`.`v_userLogin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rest-resume-api`.`v_userLogin` (`id` INT, `name` INT, `email` INT, `lastName` INT, `active` INT, `role` INT);

-- -----------------------------------------------------
-- procedure sp_saveUser
-- -----------------------------------------------------

DELIMITER $$
USE `rest-resume-api`$$
CREATE PROCEDURE `sp_saveUser` (in _email varchar(50), in _password varchar(100), in _firstName varchar(50), in _secondName varchar(50), in _lastName varchar(50), in _secondLastName varchar(50), in _recluiter int)
BEGIN

	INSERT INTO users (email,   password,  firstName,  secondName,  lastName,  secondLastName, active,  idRole,    createdAt)
    VALUES 			  (_email, _password, _firstName, _secondName, _lastName, _secondLastName,      0, _recluiter, now());

    SELECT LAST_INSERT_ID();

END$$

DELIMITER ;

-- -----------------------------------------------------
-- View `rest-resume-api`.`v_getRoles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `rest-resume-api`.`v_getRoles`;
USE `rest-resume-api`;
CREATE  OR REPLACE VIEW `v_getRoles` AS SELECT id, role FROM role;

-- -----------------------------------------------------
-- View `rest-resume-api`.`v_userByEmail`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `rest-resume-api`.`v_userByEmail`;
USE `rest-resume-api`;
CREATE  OR REPLACE VIEW `v_userByEmail` AS SELECT u.id, u.email, u.firstName, u.lastName FROM users as u;

-- -----------------------------------------------------
-- View `rest-resume-api`.`v_userLogin`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `rest-resume-api`.`v_userLogin`;
USE `rest-resume-api`;
CREATE  OR REPLACE VIEW `v_userLogin` AS SELECT u.id, u.name, u.email, u.lastName, u.active, r.role
FROM users as u
inner join role as r on u.idRole = r.id;

INSERT INTO `rest-resume-api`.`role` (`role`) VALUES ('Admin'), ('Recluiter'), ('Regular');

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
