-- create database named coviteam
-- create table named users 
-- +--------------+-------------+------+-----+---------+-------+
-- | Field        | Type        | Null | Key | Default | Extra |
-- +--------------+-------------+------+-----+---------+-------+
-- | SRN          | varchar(15) | NO   | PRI | NULL    |       |
-- | Name         | varchar(50) | NO   |     | NULL    |       |
-- | email        | varchar(40) | NO   |     | NULL    |       |
-- | phone_number | varchar(10) | NO   |     | NULL    |       |
-- | dept_id      | varchar(5)  | NO   |     | NULL    |       |
-- | semester     | int         | YES  |     | NULL    |       |
-- | rating       | double      | YES  |     | 5       |       |
-- | avaliablity  | tinyint(1)  | YES  |     | 1       |       |
-- +--------------+-------------+------+-----+---------+-------+
-- dept id is foregine key
-- create table named projects
-- +---------------+--------------+------+-----+-------------------+-------------------+
-- | Field         | Type         | Null | Key | Default           | Extra             |
-- +---------------+--------------+------+-----+-------------------+-------------------+
-- | project_id    | varchar(10)  | NO   | PRI | NULL              |                   |
-- | description   | varchar(100) | NO   |     | NULL              |                   |
-- | creation_date | timestamp    | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
-- | domain_id     | varchar(10)  | YES  |     | NULL              |                   |
-- +---------------+--------------+------+-----+-------------------+-------------------+
-- domain id is foregine key
-- create table named study_groups
-- +---------------+-------------+------+-----+-------------------+-------------------+
-- | Field         | Type        | Null | Key | Default           | Extra             |
-- +---------------+-------------+------+-----+-------------------+-------------------+
-- | group_id      | varchar(10) | NO   | PRI | NULL              |                   |
-- | name          | varchar(10) | NO   |     | NULL              |                   |
-- | creation_date | timestamp   | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
-- +---------------+-------------+------+-----+-------------------+-------------------+
-- create table named resources
-- +-------------+--------------+------+-----+---------+-------+
-- | Field       | Type         | Null | Key | Default | Extra |
-- +-------------+--------------+------+-----+---------+-------+
-- | resource_id | varchar(10)  | NO   | PRI | NULL    |       |
-- | name        | varchar(20)  | NO   |     | NULL    |       |
-- | description | varchar(100) | YES  |     | NULL    |       |
-- | type        | varchar(10)  | YES  |     | NULL    |       |
-- +-------------+--------------+------+-----+---------+-------+
-- create table named creates_groups
-- +----------+-------------+------+-----+---------+-------+
-- | Field    | Type        | Null | Key | Default | Extra |
-- +----------+-------------+------+-----+---------+-------+
-- | SRN      | varchar(15) | NO   |     | NULL    |       |
-- | group_id | varchar(10) | NO   |     | NULL    |       |
-- +----------+-------------+------+-----+---------+-------+
-- group_id  and SRN is foregine key
-- create table named creates_project
-- +------------+-------------+------+-----+---------+-------+
-- | Field      | Type        | Null | Key | Default | Extra |
-- +------------+-------------+------+-----+---------+-------+
-- | SRN        | varchar(15) | NO   |     | NULL    |       |
-- | project_id | varchar(10) | NO   |     | NULL    |       |
-- +------------+-------------+------+-----+---------+-------+
-- project_id  and SRN is foregine key
-- create table named department
-- +---------+-------------+------+-----+---------+-------+
-- | Field   | Type        | Null | Key | Default | Extra |
-- +---------+-------------+------+-----+---------+-------+
-- | dept_id | varchar(5)  | NO   | PRI | NULL    |       |
-- | name    | varchar(20) | NO   |     | NULL    |       |
-- +---------+-------------+------+-----+---------+-------+
-- create table named domain    
-- +-------------+--------------+------+-----+---------+-------+
-- | Field       | Type         | Null | Key | Default | Extra |
-- +-------------+--------------+------+-----+---------+-------+
-- | domain_id   | varchar(10)  | NO   | PRI | NULL    |       |
-- | name        | varchar(10)  | NO   |     | NULL    |       |
-- | description | varchar(100) | NO   |     | NULL    |       |
-- | skills      | varchar(10)  | YES  |     | NULL    |       |
-- +-------------+--------------+------+-----+---------+-------+
-- create table named works_on
-- +------------------+--------------+------+-----+---------+-------+
-- | Field            | Type         | Null | Key | Default | Extra |
-- +------------------+--------------+------+-----+---------+-------+
-- | SRN              | varchar(15)  | NO   |     | NULL    |       |
-- | changes_log      | varchar(100) | YES  |     | NULL    |       |
-- | project_id       | varchar(10)  | NO   |     | NULL    |       |
-- | Role             | varchar(10)  | YES  |     | NULL    |       |
-- | permission_level | int          | YES  |     | NULL    |       |
-- +------------------+--------------+------+-----+---------+-------+
-- project_id  and SRN is foregine key
-- create table named joins
-- +----------+-------------+------+-----+---------+-------+
-- | Field    | Type        | Null | Key | Default | Extra |
-- +----------+-------------+------+-----+---------+-------+
-- | group_id | varchar(10) | YES  |     | NULL    |       |
-- | SRN      | varchar(15) | YES  |     | NULL    |       |
-- | state    | tinyint(1)  | YES  |     | 0       |       |
-- +----------+-------------+------+-----+---------+-------+
-- group_id  and SRN is foregine key
-- create table named resource_being_used
-- +------------+-------------+------+-----+---------+-------+
-- | Field      | Type        | Null | Key | Default | Extra |
-- +------------+-------------+------+-----+---------+-------+
-- | project_id | varchar(10) | NO   |     | NULL    |       |
-- | resorce_id | varchar(10) | NO   |     | NULL    |       |
-- +------------+-------------+------+-----+---------+-------+
-- project_id  and resorce_id is foregine key
-- create table named user_domain_interest
-- +-----------+-------------+------+-----+---------+-------+
-- | Field     | Type        | Null | Key | Default | Extra |
-- +-----------+-------------+------+-----+---------+-------+
-- | SRN       | varchar(15) | NO   |     | NULL    |       |
-- | domain_id | varchar(10) | NO   |     | NULL    |       |
-- +-----------+-------------+------+-----+---------+-------+
-- domain_id  and SRN is foregine key
CREATE DATABASE coviteam;
USE coviteam;

CREATE TABLE department (
  dept_id varchar(5) NOT NULL PRIMARY KEY,
  name varchar(20) NOT NULL
);

CREATE TABLE domain (
  domain_id varchar(10) NOT NULL PRIMARY KEY,
  name varchar(10) NOT NULL,
  description varchar(100) NOT NULL,
  skills varchar(10)
);

CREATE TABLE users (
  SRN varchar(15) NOT NULL PRIMARY KEY,
  Name varchar(50) NOT NULL,
  email varchar(40) NOT NULL,
  phone_number varchar(10) NOT NULL,
  dept_id varchar(5) NOT NULL,
  semester int,
  rating double DEFAULT 5,
  avaliablity tinyint(1) DEFAULT 1,
  FOREIGN KEY (dept_id) REFERENCES department(dept_id)
);

CREATE TABLE projects (
  project_id varchar(10) NOT NULL PRIMARY KEY,
  description varchar(100) NOT NULL,
  creation_date timestamp DEFAULT CURRENT_TIMESTAMP,
  domain_id varchar(10),
  FOREIGN KEY (domain_id) REFERENCES domain(domain_id)
);

CREATE TABLE study_groups (
  group_id varchar(10) NOT NULL PRIMARY KEY,
  email varchar(40) NOT NULL,
  name varchar(10) NOT NULL,
  creation_date timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE resources (
  resource_id varchar(10) NOT NULL PRIMARY KEY,
  name varchar(20) NOT NULL,
  description varchar(100),
  type varchar(10)
);

CREATE TABLE creates_groups (
  SRN varchar(15) NOT NULL,
  group_id varchar(10) NOT NULL,
  FOREIGN KEY (SRN) REFERENCES users(SRN),
  FOREIGN KEY (group_id) REFERENCES study_groups(group_id)
);

CREATE TABLE creates_project (
  SRN varchar(15) NOT NULL,
  project_id varchar(10) NOT NULL,
  FOREIGN KEY (SRN) REFERENCES users(SRN),
  FOREIGN KEY (project_id) REFERENCES projects(project_id)
);

CREATE TABLE works_on (
  SRN varchar(15) NOT NULL,
  changes_log varchar(100),
  project_id varchar(10) NOT NULL,
  Role varchar(10),
  permission_level int,
  FOREIGN KEY (SRN) REFERENCES users(SRN),
  FOREIGN KEY (project_id) REFERENCES projects(project_id)
);

CREATE TABLE joins (
  group_id varchar(10),
  SRN varchar(15),
  state tinyint(1) DEFAULT 0,
  FOREIGN KEY (SRN) REFERENCES users(SRN),
  FOREIGN KEY (group_id) REFERENCES study_groups(group_id)
);

CREATE TABLE resource_being_used (
  project_id varchar(10) NOT NULL,
  resource_id varchar(10) NOT NULL,
  FOREIGN KEY (project_id) REFERENCES projects(project_id),
  FOREIGN KEY (resource_id) REFERENCES resources(resource_id)
);

CREATE TABLE user_domain_interest (
  SRN varchar(15) NOT NULL,
  domain_id varchar(10) NOT NULL,
  FOREIGN KEY (SRN) REFERENCES users(SRN),
  FOREIGN KEY (domain_id) REFERENCES domain(domain_id)
);
ALTER TABLE users
ADD photo MEDIUMBLOB;

ALTER TABLE projects
ADD photo MEDIUMBLOB;

ALTER TABLE study_groups
ADD photo MEDIUMBLOB;
ALTER TABLE users
ADD FOREIGN KEY (dept_id) REFERENCES department(dept_id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE projects
ADD FOREIGN KEY (domain_id) REFERENCES domain(domain_id) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE creates_groups
ADD FOREIGN KEY (SRN) REFERENCES users(SRN) ON DELETE CASCADE ON UPDATE CASCADE,
ADD FOREIGN KEY (group_id) REFERENCES study_groups(group_id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE creates_project
ADD FOREIGN KEY (SRN) REFERENCES users(SRN) ON DELETE CASCADE ON UPDATE CASCADE,
ADD FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE works_on
ADD FOREIGN KEY (SRN) REFERENCES users(SRN) ON DELETE CASCADE ON UPDATE CASCADE,
ADD FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE joins
ADD FOREIGN KEY (SRN) REFERENCES users(SRN) ON DELETE CASCADE ON UPDATE CASCADE,
ADD FOREIGN KEY (group_id) REFERENCES study_groups(group_id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE resource_being_used
ADD FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE ON UPDATE CASCADE,
ADD FOREIGN KEY (resource_id) REFERENCES resources(resource_id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE user_domain_interest
ADD FOREIGN KEY (SRN) REFERENCES users(SRN) ON DELETE CASCADE ON UPDATE CASCADE,
ADD FOREIGN KEY (domain_id) REFERENCES domain(domain_id) ON DELETE CASCADE ON UPDATE CASCADE;