-- Insert dummy data into scoring database

INSERT INTO sex(name) VALUES
    ('male'),
    ('female');
INSERT INTO role(name) VALUES
    ('admin'),
    ('td'),
    ('user');
INSERT INTO user(name, password, role_id) VALUES
    ('admin', 'admin', 1),
    ('Test Player', 'password', 3);
INSERT INTO phase(name) VALUES
    ('announce'),
    ('registration'),
    ('closed'),
    ('active'),
    ('complete');
INSERT INTO competition(start_date, name, phase_id) VALUES
    ('2022-05-01', 'Test competition', 1),
    ('2022-05-02', 'Test phase 2', 2);
INSERT INTO registration(user_id, competition_id) VALUES
    (1, 1),
    (2, 2);
INSERT INTO course(name, holes) VALUES
    ('Testirata', 9);
INSERT INTO round(date, competition_id) VALUES
    ('2022-05-01', 1);
INSERT INTO groups(group_number, start_position, user_id, round_id) VALUES
    (1, 1, 1, 1),
    (1, 2, 2, 1);
INSERT INTO score(hole, result, user_id, round_id) VALUES
    (1, 3, 2, 1),
    (2, 3, 2, 1),
    (3, 3, 2, 1),
    (4, 3, 2, 1),
    (5, 3, 2, 1),
    (6, 3, 2, 1),
    (7, 3, 2, 1),
    (8, 3, 2, 1),
    (9, 3, 2, 1),
    (1, 2, 1, 1);
