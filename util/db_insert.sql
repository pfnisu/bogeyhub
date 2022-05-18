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
    ('admin', 'bf1bb50b534ed0e3f690d3a9193d46ab15dffb42a8f2433dbf9af9abe9a10fbf4e53bc0c95cdd0b9e3e14f3b7152355b2d70a850f284e128cb00edb6610c9b89', 1);
INSERT INTO phase(name) VALUES
    ('announce'),
    ('registration'),
    ('closed'),
    ('ongoing'),
    ('complete');
INSERT INTO course(name, holes) VALUES
    ('Sellupuiston frisbeegolfrata', 9),
    ('Epilä frisbeegolfpuisto', 15),
    ('Kortekumpu frisbeegolf', 18);
INSERT INTO hole(name, par, course_id) VALUES
    ('1', 3, 1),
    ('2', 3, 1),
    ('3', 4, 1),
    ('4', 3, 1),
    ('5', 3, 1),
    ('6', 3, 1),
    ('7', 3, 1),
    ('8', 3, 1),
    ('9', 4, 1),
    ('1', 3, 2),
    ('2', 4, 2),
    ('3', 3, 2),
    ('4', 3, 2),
    ('5', 3, 2),
    ('6', 3, 2),
    ('7', 3, 2),
    ('8', 3, 2),
    ('9', 4, 2),
    ('10', 3, 2),
    ('11', 3, 2),
    ('12', 3, 2),
    ('13', 3, 2),
    ('14', 3, 2),
    ('15', 3, 2),
    ('1', 3, 3),
    ('2', 4, 3),
    ('3', 3, 3),
    ('4', 4, 3),
    ('5', 4, 3),
    ('6', 4, 3),
    ('7', 3, 3),
    ('8', 3, 3),
    ('9', 3, 3),
    ('10', 3, 3),
    ('11', 3, 3),
    ('12', 3, 3),
    ('13', 3, 3),
    ('14', 3, 3),
    ('15', 3, 3),
    ('16', 3, 3),
    ('17', 3, 3),
    ('18', 3, 3);
