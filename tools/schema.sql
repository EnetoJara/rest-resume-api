-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema rest-resume-api
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema rest-resume-api
-- -----------------------------------------------------
DROP database `rest-resume-api`;
CREATE SCHEMA IF NOT EXISTS `rest-resume-api` DEFAULT CHARACTER SET utf8 ;
USE `rest-resume-api` ;

-- -----------------------------------------------------
-- Table `rest-resume-api`.`role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rest-resume-api`.`role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `role` VARCHAR(45) NOT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT now(),
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
  `createdAt` TIMESTAMP NOT NULL,
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
  `createdAt` TIMESTAMP NOT NULL,
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
  `createdAt` TIMESTAMP NOT NULL,
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


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

INSERT INTO `rest-resume-api`.`role` (`id`, `role`, `createdAt`) VALUES ('1', 'Admin', now());
INSERT INTO `rest-resume-api`.`role` (`id`, `role`, `createdAt`) VALUES ('2', 'Recruiter', NOW());
INSERT INTO `rest-resume-api`.`role` (`id`, `role`, `createdAt`) VALUES ('3', 'Regular', NOW());

DROP procedure if exists `get_roles`;

DELIMITER $$
USE `rest-resume-api`$$
CREATE PROCEDURE `get_roles` ()
BEGIN
SELECT * FROM role;
END$$

DELIMITER ;

USE `rest-resume-api`;
DROP procedure IF EXISTS `getUserByEmail`;

DELIMITER $$
USE `rest-resume-api`$$
CREATE PROCEDURE `getUserByEmail` (in _email varchar(50) )
BEGIN
	select * from users where email = _email;
END$$

DELIMITER ;

