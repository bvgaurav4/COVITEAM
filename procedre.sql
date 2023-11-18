

 DELIMITER //
CREATE PROCEDURE GetStudyGroupsJoinJoinsUsers(IN emailParam VARCHAR(40))
BEGIN
  SELECT study_groups.group_id,study_groups.name,study_groups.creation_date,study_groups.photo FROM study_groups 
  JOIN joins ON study_groups.group_id = joins.group_id
  JOIN users ON users.SRN = study_groups.SRN
  WHERE users.email = emailParam AND joins.state = 1;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE GetProjectsJoinWorksOnUsers(IN emailParam VARCHAR(40))
BEGIN
  SELECT * FROM projects 
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
  INSERT INTO joins (group_id, SRN) VALUES (groupId, groupSRN);
END //
DELIMITER ;