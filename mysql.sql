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
  skills varchar(100)
);

CREATE TABLE users (
  SRN varchar(15) NOT NULL PRIMARY KEY,
  Name varchar(50) NOT NULL,
  email varchar(40) NOT NULL,
  password varchar(255) NOT NULL,
  phone_number varchar(10) NOT NULL,
  dept_id varchar(5) NOT NULL,
  semester int,
  rating double DEFAULT 5,
  avaliablity tinyint(1) DEFAULT 1,
  photo MEDIUMBLOB,
  FOREIGN KEY (dept_id) REFERENCES department(dept_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE projects (
  project_id varchar(10) NOT NULL PRIMARY KEY,
  SRN varchar(15) NOT NULL,
  description varchar(100) NOT NULL,
  creation_date timestamp DEFAULT CURRENT_TIMESTAMP,
  domain_id varchar(10),
  photo MEDIUMBLOB,
  FOREIGN KEY (domain_id) REFERENCES domain(domain_id) ON DELETE SET NULL ON UPDATE CASCADE,
  FOREIGN KEY (SRN) REFERENCES users(SRN)
);

CREATE TABLE study_groups (
  group_id varchar(10) NOT NULL PRIMARY KEY,
  email varchar(40) NOT NULL,
  SRN varchar(15) NOT NULL,
  name varchar(10) NOT NULL,
  creation_date timestamp DEFAULT CURRENT_TIMESTAMP,
  photo MEDIUMBLOB,
  FOREIGN KEY (SRN) REFERENCES users(SRN)
);

CREATE TABLE resources (
  resource_id varchar(10) NOT NULL PRIMARY KEY,
  name varchar(20) NOT NULL,
  description varchar(100),
  type varchar(10)
);

CREATE TABLE works_on (
  SRN varchar(15) NOT NULL,
  changes_log varchar(100),
  project_id varchar(10) NOT NULL,
  Role varchar(10),
  permission_level int,
  FOREIGN KEY (SRN) REFERENCES users(SRN) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE joins (
  group_id varchar(10),
  SRN varchar(15),
  state tinyint(1) DEFAULT 0,
  FOREIGN KEY (SRN) REFERENCES users(SRN) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (group_id) REFERENCES study_groups(group_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE resource_being_used (
  project_id varchar(10) NOT NULL,
  resource_id varchar(10) NOT NULL,
  FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (resource_id) REFERENCES resources(resource_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE user_domain_interest (
  SRN varchar(15) NOT NULL,
  domain_id varchar(10) NOT NULL, 
  FOREIGN KEY (SRN) REFERENCES users(SRN) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (domain_id) REFERENCES domain(domain_id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE log (
  id INT AUTO_INCREMENT PRIMARY KEY,
  table_name VARCHAR(255),
  operation VARCHAR(255),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE users ADD project_count INT DEFAULT 0;
-- Sample data for department table
INSERT INTO department (dept_id, name) VALUES
('D001', 'Computer Science'),
('D002', 'Electronics and Communication'),
('D003', 'Mechanical Engineering');

-- Sample data for domain table
INSERT INTO domain (domain_id, name, description, skills) VALUES
('DM001', 'Web Development', 'Developing web applications', 'HTML, CSS, JavaScript'),
('DM002', 'Mobile Development', 'Developing mobile applications', 'Java, Kotlin, Swift'),
('DM003', 'Data Science', 'Extracting insights from data', 'Python, R, SQL');

-- Sample data for users table
INSERT INTO users (SRN, Name, email, password, phone_number, dept_id, semester, rating, avaliablity) VALUES
('SRN001', 'John Doe', 'johndoe@example.com', 'password', '1234567890', 'D001', 5, 4.5, 1),
('SRN002', 'Jane Doe', 'janedoe@example.com', 'password', '1234567890', 'D002', 6, 4.8, 1),
('SRN003', 'Bob Smith', 'bobsmith@example.com', 'password', '1234567890', 'D003', 7, 4.2, 0);

-- Sample data for projects table
INSERT INTO projects (project_id, SRN, description, domain_id) VALUES
('P001', 'SRN001', 'Developing a web application for online shopping', 'DM001'),
('P002', 'SRN002', 'Developing a mobile application for food delivery', 'DM002'),
('P003', 'SRN003', 'Analyzing customer data for a retail company', 'DM003');

-- Sample data for study_groups table
INSERT INTO study_groups (group_id, email, SRN, name) VALUES
('G001', 'group1@example.com', 'SRN001', 'Group 1'),
('G002', 'group2@example.com', 'SRN002', 'Group 2'),
('G003', 'group3@example.com', 'SRN003', 'Group 3');

-- Sample data for resources table
INSERT INTO resources (resource_id, name, description, type) VALUES
('R001', 'Laptop', 'A laptop for development work', 'Hardware'),
('R002', 'Textbook', 'A textbook for reference', 'Book'),
('R003', 'Online Course', 'An online course for learning new skills', 'Course');

-- Sample data for works_on table
INSERT INTO works_on (SRN, changes_log, project_id, Role, permission_level) VALUES
('SRN001', 'Added login functionality', 'P001', 'Developer', 1),
('SRN002', 'Designed UI', 'P002', 'Designer', 2),
('SRN003', 'Performed data analysis', 'P003', 'Data Analyst', 3);

-- Sample data for joins table
INSERT INTO joins (group_id, SRN, state) VALUES
('G001', 'SRN001', 1),
('G002', 'SRN002', 0),
('G003', 'SRN003', 1);

-- Sample data for resource_being_used table
INSERT INTO resource_being_used (project_id, resource_id) VALUES
('P001', 'R001'),
('P002', 'R002'),
('P003', 'R003');

-- Sample data for user_domain_interest table
INSERT INTO user_domain_interest (SRN, domain_id) VALUES
('SRN001', 'DM001'),
('SRN002', 'DM002'),
('SRN003', 'DM003');
