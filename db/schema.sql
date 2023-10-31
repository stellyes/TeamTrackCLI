DROP DATABASE IF EXISTS TeamTrack;
CREATE DATABASE TeamTrack;

USE TeamTrack;

CREATE TABLE departments(
    id              INT         NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

-- Start AUTO_INCREMENT at 100 to prevent confusion
-- between departments and other tables with AUTO_INCREMENT
ALTER TABLE departments AUTO_INCREMENT = 100;

CREATE TABLE roles(
    job_title       VARCHAR(30) NOT NULL,
    id              INT         NOT NULL AUTO_INCREMENT,
    department_id   INT,
    salary          DECIMAL     NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL,
    PRIMARY KEY (id)
);

-- Start AUTO_INCREMENT at 500 to prevent confusion
-- between roles and other tables with AUTO_INCREMENT
ALTER TABLE roles AUTO_INCREMENT = 500;

CREATE TABLE employees(
    id              INT         NOT NULL AUTO_INCREMENT,
    first_name      VARCHAR(30) NOT NULL,
    last_name       VARCHAR(30) NOT NULL,
    role_id         INT,
    manager_id      INT,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL,
    PRIMARY KEY (id)
);

-- Start AUTO_INCREMENT at 1000 to prevent confusion
-- between employees and other tables with AUTO_INCREMENT
ALTER TABLE employees AUTO_INCREMENT=1000;