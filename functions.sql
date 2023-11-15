DELIMITER //
CREATE FUNCTION GetJoinCountForGroup(group_id_param VARCHAR(10))
RETURNS INT DETERMINISTIC
BEGIN
  DECLARE join_count INT;
  SELECT COUNT(*) INTO join_count
  FROM joins
  JOIN study_groups g ON joins.group_id = g.group_id
  WHERE joins.state = 1 AND g.group_id = group_id_param;
  RETURN join_count;
END //
DELIMITER ;

DELIMITER //
CREATE FUNCTION GetProjectResourceCount(project_id_param VARCHAR(10))
RETURNS INT DETERMINISTIC
BEGIN
  DECLARE resource_count INT;
  SELECT COUNT(*) INTO resource_count
  FROM resource_being_used
  WHERE project_id = project_id_param;
  RETURN resource_count;
END //
DELIMITER ;