-- Create tables for scoring database

CREATE TABLE sex (
    id SERIAL PRIMARY KEY,
    name CHARACTER VARYING(20) NOT NULL
);

CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    name CHARACTER VARYING(20) NOT NULL
);

CREATE TABLE usr (
    id SERIAL PRIMARY KEY,
    name CHARACTER VARYING(100) NOT NULL,
    password CHARACTER(192) NOT NULL,
    birth_year INTEGER,
    sex_id INTEGER,
    role_id INTEGER NOT NULL,
    FOREIGN KEY(sex_id) REFERENCES sex(id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY(role_id) REFERENCES role(id)
        ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE course (
    id SERIAL PRIMARY KEY,
    name CHARACTER VARYING(100) NOT NULL,
    holes INTEGER NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    info TEXT
);

CREATE TABLE hole (
    id SERIAL PRIMARY KEY,
    name CHARACTER VARYING(20) NOT NULL,
    par INTEGER NOT NULL,
    meters INTEGER,
    course_id INTEGER NOT NULL,
    FOREIGN KEY(course_id) REFERENCES course(id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE phase (
    id SERIAL PRIMARY KEY,
    name CHARACTER VARYING(20) NOT NULL,
    info TEXT
);

CREATE TABLE competition (
    id SERIAL PRIMARY KEY,
    start_date DATE NOT NULL,
    end_date DATE,
    name CHARACTER VARYING(100) NOT NULL,
    venue CHARACTER VARYING(100),
    max_users INTEGER,
    info TEXT,
    phase_id INTEGER NOT NULL,
    FOREIGN KEY(phase_id) REFERENCES phase(id)
        ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE division (
    id SERIAL PRIMARY KEY,
    name CHARACTER VARYING(20) NOT NULL
);

CREATE TABLE registration (
    dt TIMESTAMP NOT NULL DEFAULT now(),
    division_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    competition_id INTEGER NOT NULL,
    PRIMARY KEY(user_id, competition_id),
    FOREIGN KEY(division_id) REFERENCES division(id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY(user_id) REFERENCES usr(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(competition_id) REFERENCES competition(id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE rnd (
    id SERIAL PRIMARY KEY,
    name CHARACTER VARYING(20) NOT NULL,
    start_date DATE,
    start_time TIME WITHOUT TIME ZONE NOT NULL,
    course_id INTEGER NOT NULL,
    competition_id INTEGER NOT NULL,
    FOREIGN KEY(course_id) REFERENCES course(id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY(competition_id) REFERENCES competition(id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE grp (
    group_number INTEGER NOT NULL,
    start_time TIME WITHOUT TIME ZONE NOT NULL,
    start_hole INTEGER,
    start_position INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    round_id INTEGER NOT NULL,
    PRIMARY KEY(user_id, round_id),
    FOREIGN KEY(user_id) REFERENCES usr(id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY(round_id) REFERENCES rnd(id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE score (
    result INTEGER NOT NULL,
    dt TIMESTAMP NOT NULL DEFAULT now(),
    input_user_id INTEGER,
    hole_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    round_id INTEGER NOT NULL,
    PRIMARY KEY(hole_id, user_id, round_id),
    FOREIGN KEY(hole_id) REFERENCES hole(id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY(user_id) REFERENCES usr(id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY(round_id) REFERENCES rnd(id)
        ON DELETE CASCADE ON UPDATE CASCADE
);
