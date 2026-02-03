DROP DATABASE IF EXISTS better_timer_development;
DROP DATABASE IF EXISTS better_timer_test;

CREATE DATABASE better_timer_development;
CREATE DATABASE better_timer_test;

CREATE USER 'better_timer_development'@'%' IDENTIFIED BY 'better_timer_development';
CREATE USER 'better_timer_test'@'%' IDENTIFIED BY 'better_timer_test';
CREATE USER IF NOT EXISTS 'root'@'%';

GRANT ALL ON better_timer_development.* TO 'better_timer_development'@'%' WITH GRANT OPTION;
GRANT ALL ON better_timer_test.* TO 'better_timer_test'@'%' WITH GRANT OPTION;
GRANT ALL ON *.* TO 'root'@'%' WITH GRANT OPTION;

FLUSH PRIVILEGES;