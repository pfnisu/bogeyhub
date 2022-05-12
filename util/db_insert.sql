-- Insert dummy data into scoring database

INSERT INTO sex(name) VALUES
    ('male'),
    ('female');
INSERT INTO role(name) VALUES
    ('admin'),
    ('td'),
    ('user');
INSERT INTO division(name) VALUES
    ('MPO'),
    ('FPO');
INSERT INTO user(name, password, role_id) VALUES
    ('admin', 'bf1bb50b534ed0e3f690d3a9193d46ab15dffb42a8f2433dbf9af9abe9a10fbf4e53bc0c95cdd0b9e3e14f3b7152355b2d70a850f284e128cb00edb6610c9b89', 1),
    ('Test Player', 'fd383ca984b23c590d35c37f140693b7708d29fd7d772cd96bb681d5a0f0176b47aeb088ce04ba2e68aa090cc2678475d9b280d61a445e51720713e36e2a5712', 3);
INSERT INTO phase(name) VALUES
    ('announce'),
    ('registration'),
    ('closed'),
    ('active'),
    ('complete');
INSERT INTO competition(start_date, name, info, phase_id) VALUES
    ('2022-05-01', 'Test competition', 'Info text', 1);
INSERT INTO registration(division_id, user_id, competition_id) VALUES
    (1, 2, 1);
INSERT INTO course(name, holes) VALUES
    ('Test course', 9);
INSERT INTO hole(name, par, course_id) VALUES
    ('1', 3, 1),
    ('2', 3, 1),
    ('3', 3, 1),
    ('4', 3, 1),
    ('5', 3, 1),
    ('6', 3, 1),
    ('7', 3, 1),
    ('8', 3, 1),
    ('9', 4, 1);
INSERT INTO round(start_time, course_id, competition_id) VALUES
    ('12:00:00', 1, 1);
INSERT INTO grp(group_number, start_position, user_id, round_id) VALUES
    (1, 1, 2, 1);
INSERT INTO score(hole_id, result, user_id, round_id) VALUES
    (1, 3, 2, 1),
    (2, 3, 2, 1),
    (3, 3, 2, 1),
    (4, 3, 2, 1),
    (5, 3, 2, 1),
    (6, 3, 2, 1),
    (7, 3, 2, 1),
    (8, 3, 2, 1),
    (9, 2, 2, 1);
