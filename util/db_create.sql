-- Create tables for scoring database

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
    info TEXT
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

CREATE TABLE registration (
    time TIMESTAMP DEFAULT now(),
    user_id INT NOT NULL,
    competition_id INT NOT NULL,
    PRIMARY KEY(user_id, competition_id),
    FOREIGN KEY(user_id) REFERENCES user(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(competition_id) REFERENCES competition(id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE round (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    course_id INT,
    competition_id INT NOT NULL,
    FOREIGN KEY(course_id) REFERENCES course(id)
        ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY(competition_id) REFERENCES competition(id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE groups (
    group_number INT NOT NULL,
    start_time DATE,
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
    hole INT NOT NULL,
    user_id INT NOT NULL,
    round_id INT NOT NULL,
    PRIMARY KEY(hole, user_id, round_id),
    FOREIGN KEY(user_id) REFERENCES user(id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY(round_id) REFERENCES round(id)
        ON DELETE CASCADE ON UPDATE CASCADE
);
