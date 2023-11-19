DELIMITER //
CREATE TRIGGER after_project_insert
AFTER INSERT ON projects
FOR EACH ROW
BEGIN
   UPDATE users SET project_count = project_count + 1 WHERE SRN = NEW.SRN;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER log_project_insert
AFTER INSERT ON projects
FOR EACH ROW
BEGIN
  INSERT INTO log (table_name, operation) VALUES ('projects', 'INSERT');
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER log_Group_insert
AFTER INSERT ON study_groups
FOR EACH ROW
BEGIN
  INSERT INTO log (table_name, operation) VALUES ('study_groups', 'INSERT');
END //
DELIMITER ;