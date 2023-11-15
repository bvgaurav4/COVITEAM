

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