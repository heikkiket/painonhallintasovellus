CREATE USER 'expressmysql'@'%';
CREATE DATABASE painonhallinta_db;
GRANT ALL PRIVILEGES ON painonhallinta_db.* TO 'expressmysql'@'%' IDENTIFIED BY 'UomaWoo4';

CREATE DATABASE IF NOT EXISTS painonhallinta_db;
USE painonhallinta_db;

CREATE TABLE IF NOT EXISTS users
(
  Id INT NOT NULL AUTO_INCREMENT,
  UserName VARCHAR(100) NOT NULL,
  Height FLOAT NOT NULL,
  StartingWeight FLOAT NOT NULL,
  TargetWeight FLOAT NOT NULL,
  Password varchar(64),
  PRIMARY KEY (Id)
);

CREATE TABLE IF NOT EXISTS measures
(
  Weight FLOAT NOT NULL,
  Id INT NOT NULL AUTO_INCREMENT,
  MeasureDate DATE NOT NULL,
  UserId INT NOT NULL,
  PRIMARY KEY (Id),
  FOREIGN KEY (UserId) REFERENCES users(Id)
);
