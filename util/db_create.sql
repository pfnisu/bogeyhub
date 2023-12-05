-- Create tables for scoring database
DROP DATABASE IF EXISTS dbpfnisu2;
CREATE DATABASE dbpfnisu2;
USE dbpfnisu2;

CREATE TABLE sex (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL
);

CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL
);

CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    password CHAR(192) NOT NULL,
    birth_year INT,
    sex_id INT,
    role_id INT NOT NULL,
    FOREIGN KEY(sex_id) REFERENCES sex(id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY(role_id) REFERENCES role(id)
        ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE course (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    holes INT NOT NULL,
    active BOOLEAN NOT NULL,
    info TEXT
);

CREATE TABLE hole (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    par INT NOT NULL,
    meters INT,
    course_id INT NOT NULL,
    FOREIGN KEY(course_id) REFERENCES course(id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE phase (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    info TEXT
);

CREATE TABLE competition (
    id INT AUTO_INCREMENT PRIMARY KEY,
    start_date DATE NOT NULL,
    end_date DATE,
    name VARCHAR(100) NOT NULL,
    venue VARCHAR(100),
    max_users INT,
    info TEXT,
    phase_id INT NOT NULL,
    FOREIGN KEY(phase_id) REFERENCES phase(id)
        ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE division (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL
);

CREATE TABLE registration (
    time TIMESTAMP DEFAULT now(),
    division_id INT NOT NULL,
    user_id INT NOT NULL,
    competition_id INT NOT NULL,
    PRIMARY KEY(user_id, competition_id),
    FOREIGN KEY(division_id) REFERENCES division(id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY(user_id) REFERENCES user(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(competition_id) REFERENCES competition(id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE round (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    start_date DATE,
    start_time TIME NOT NULL,
    course_id INT NOT NULL,
    competition_id INT NOT NULL,
    FOREIGN KEY(course_id) REFERENCES course(id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY(competition_id) REFERENCES competition(id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE grp (
    group_number INT NOT NULL,
    start_time TIME,
    start_hole INT,
    start_position INT NOT NULL,
    user_id INT NOT NULL,
    round_id INT NOT NULL,
    PRIMARY KEY(user_id, round_id),
    FOREIGN KEY(user_id) REFERENCES user(id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY(round_id) REFERENCES round(id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE score (
    result INT NOT NULL,
    time TIMESTAMP DEFAULT now(),
    input_user_id INT,
    hole_id INT NOT NULL,
    user_id INT NOT NULL,
    round_id INT NOT NULL,
    PRIMARY KEY(hole_id, user_id, round_id),
    FOREIGN KEY(hole_id) REFERENCES hole(id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY(user_id) REFERENCES user(id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY(round_id) REFERENCES round(id)
        ON DELETE CASCADE ON UPDATE CASCADE
);
