

DELIMITER //
CREATE PROCEDURE GetStudyGroupsJoinJoinsUsers(IN emailParam VARCHAR(40))
BEGIN
  SELECT DISTINCT study_groups.group_id, study_groups.name, study_groups.creation_date, study_groups.photo
  FROM study_groups 
  JOIN joins ON study_groups.group_id = joins.group_id
  JOIN users ON users.SRN = study_groups.SRN
  WHERE users.email = emailParam AND joins.state = 1;
END //
DELIMITER ;b


DELIMITER //
CREATE PROCEDURE GetProjectsJoinWorksOnUsers(IN emailParam VARCHAR(40))
BEGIN
  SELECT DISTINCT projects.*, users.*
  FROM projects 
  JOIN works_on ON projects.SRN = works_on.SRN
  JOIN users ON users.SRN = works_on.SRN
  WHERE users.email = emailParam;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE AddStudyGroup( IN groupEmail VARCHAR(40),  IN groupName VARCHAR(10))
BEGIN
  DECLARE groupSRN VARCHAR(15);
  DECLARE groupId VARCHAR(10);
  SET groupId = SUBSTRING(UUID(), 1, 10);
  SELECT SRN INTO groupSRN FROM users WHERE email = groupEmail;
  INSERT INTO study_groups (group_id, email, SRN, name) VALUES (groupId, groupEmail, groupSRN, groupName);
  INSERT INTO joins (group_id, SRN,state) VALUES (groupId, groupSRN,1);
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE AddProject(IN p_description VARCHAR(100), IN p_domain VARCHAR(10), IN emailParam VARCHAR(40), IN p_name VARCHAR(50))
BEGIN
  DECLARE p_SRN VARCHAR(15);
  DECLARE p_project_id VARCHAR(10);
  
  DECLARE p_domain_id VARCHAR(10);

  SELECT domain_id into p_domain_id FROM domain WHERE skills LIKE CONCAT('%', p_domain, '%') LIMIT 1; 
  SELECT SRN INTO p_SRN FROM users WHERE email = emailParam;
  SET p_project_id = SUBSTRING(UUID(), 1, 10);
  
  INSERT INTO projects (project_id, SRN, project_name, description, domain_id) 
  VALUES (p_project_id, p_SRN, p_name, p_description, p_domain_id);

  INSERT INTO works_on (project_id, SRN,permission_level) VALUES (p_project_id, p_SRN,"777");
END //
DELIMITER ;

-- nested query to request to join a group
DELIMITER //
CREATE PROCEDURE GetActiveJoins(IN emailParam VARCHAR(40))
BEGIN
  SELECT j.*, u.SRN as ownerSRN, sg.name 
  FROM joins j, users u, study_groups sg
  WHERE j.group_id = sg.group_id 
  AND u.SRN = sg.SRN
  AND u.email = emailParam
  AND j.state = 0
  AND sg.group_id IN (
    SELECT group_id
    FROM study_groups
    WHERE SRN = u.SRN
  );
END //
DELIMITER ;

GRANT All PRIVILEGES ON database_name.table_name TO 'username'@'host';

DELIMITER //
CREATE PROCEDURE messaging(IN group_id VARCHAR(10), in emailParam VARCHAR(40), in message VARCHAR(100))
BEGIN
    DECLARE sender VARCHAR(15);
    select SRN into sender from users where email = emailParam;
    INSERT INTO messages (sender, group_id, message) VALUES (sender, group_id, message);
END //


-- correleated query to get all the members of a group
DELIMITER //
CREATE PROCEDURE getgroupmem(in group_id_sent VARCHAR(10))
BEGIN
SELECT u.*
FROM users u
WHERE EXISTS (
    SELECT 1
    FROM joins j
    WHERE j.SRN = u.SRN AND j.group_id = group_id_sent);
  END //
  DELIMITER ;
