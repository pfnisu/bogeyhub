-- Create tables for scoring database

CREATE TABLE sex (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL
);

CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    password CHAR(192) NOT NULL,
    birth_year INT,
    sex_id INT,
    FOREIGN KEY(sex_id) REFERENCES sex(id)
        ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE course (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
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
    date DATE NOT NULL,
    name VARCHAR(100) NOT NULL,
    venue VARCHAR(100),
    max_users INT,
    info TEXT,
    phase_id INT NOT NULL,
    FOREIGN KEY(phase_id) REFERENCES phase(id)
        ON DELETE RESTRICT ON UPDATE CASCADE
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
    course_id INT,
    competition_id INT NOT NULL,
    FOREIGN KEY(course_id) REFERENCES course(id)
        ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY(competition_id) REFERENCES competition(id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE card (
    id INT AUTO_INCREMENT PRIMARY KEY,
    start_time DATE,
    start_hole INT,
    round_id INT NOT NULL,
    FOREIGN KEY(round_id) REFERENCES round(id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE card_player (
    start_position INT NOT NULL,
    user_id INT NOT NULL,
    card_id INT NOT NULL,
    PRIMARY KEY(user_id, card_id),
    FOREIGN KEY(user_id) REFERENCES user(id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY(card_id) REFERENCES card(id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE score (
    hole INT NOT NULL,
    result INT NOT NULL,
    user_id INT NOT NULL,
    round_id INT NOT NULL,
    PRIMARY KEY(user_id, round_id),
    FOREIGN KEY(user_id) REFERENCES user(id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY(round_id) REFERENCES round(id)
        ON DELETE CASCADE ON UPDATE CASCADE
);
