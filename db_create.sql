-- Create tables for scoring database

CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    password CHAR(192) NOT NULL,
    sex VARCHAR(10),
    birth_year INT
);

CREATE TABLE course (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    name VARCHAR(100) NOT NULL,
    holes INT NOT NULL,
    info TEXT
);

CREATE TABLE competition (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    name VARCHAR(100) NOT NULL,
    venue VARCHAR(100) NOT NULL,
    phase VARCHAR(12) NOT NULL,
    max_users INT,
    info TEXT
);

CREATE TABLE registration (
    time TIMESTAMP NOT NULL, -- DEFAULT now(),
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
    course_id INT NOT NULL,
    competition_id INT NOT NULL,
    FOREIGN KEY(course_id) REFERENCES course(id)
        ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY(competition_id) REFERENCES competition(id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE group (
    id INT AUTO_INCREMENT PRIMARY KEY,
    start_time DATE,
    start_hole INT,
    round_id INT NOT NULL,
    FOREIGN KEY(round_id) REFERENCES round(id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE group_player (
    start_position INT NOT NULL,
    user_id INT NOT NULL,
    group_id INT NOT NULL,
    PRIMARY KEY(user_id, group_id),
    FOREIGN KEY(user_id) REFERENCES user(id)
        ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY(group_id) REFERENCES group(id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE score (
    hole INT NOT NULL,
    result INT NOT NULL,
    user_id INT NOT NULL,
    round_id INT NOT NULL,
    PRIMARY KEY(user_id, round_id),
    FOREIGN KEY(user_id) REFERENCES user(id)
        ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY(round_id) REFERENCES round(id)
        ON DELETE CASCADE ON UPDATE CASCADE
);
