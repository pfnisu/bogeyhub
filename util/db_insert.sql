-- Insert dummy data into scoring database
USE dbpfnisu2;

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
    ('Kortekumpu frisbeegolf', 18),
    ('Julkujärvi DiscGolfPark', 18);
INSERT INTO hole(name, par, meters, course_id) VALUES
    ('1', 3, 87, 1),
    ('2', 3, 134, 1),
    ('3', 4, 161, 1),
    ('4', 3, 56, 1),
    ('5', 3, 68, 1),
    ('6', 3, 94, 1),
    ('7', 3, 68, 1),
    ('8', 3, 101, 1),
    ('9', 4, 186, 1),
    ('1', 3, 136, 2),
    ('2', 4, 154, 2),
    ('3', 3, 105, 2),
    ('4', 3, 114, 2),
    ('5', 3, 99, 2),
    ('6', 3, 117, 2),
    ('7', 3, 95, 2),
    ('8', 3, 96, 2),
    ('9', 4, 126, 2),
    ('10', 3, 115, 2),
    ('11', 3, 91, 2),
    ('12', 3, 81, 2),
    ('13', 3, 83, 2),
    ('14', 3, 71, 2),
    ('15', 3, 77, 2),
    ('1', 3, 71, 3),
    ('2', 4, 180, 3),
    ('3', 3, 78, 3),
    ('4', 4, 224, 3),
    ('5', 4, 164, 3),
    ('6', 4, 177, 3),
    ('7', 3, 94, 3),
    ('8', 3, 98, 3),
    ('9', 3, 139, 3),
    ('10', 3, 88, 3),
    ('11', 3, 68, 3),
    ('12', 3, 84, 3),
    ('13', 3, 78, 3),
    ('14', 3, 107, 3),
    ('15', 3, 113, 3),
    ('16', 3, 109, 3),
    ('17', 3, 104, 3),
    ('18', 3, 93, 3),
    ('1', 3, 95, 4),
    ('2', 3, 126, 4),
    ('3', 3, 120, 4),
    ('4', 4, 210, 4),
    ('5', 4, 192, 4),
    ('6', 3, 120, 4),
    ('7', 4, 165, 4),
    ('8', 3, 92, 4),
    ('9', 4, 214, 4),
    ('10', 4, 233, 4),
    ('11', 3, 128, 4),
    ('12', 3, 80, 4),
    ('13', 4, 180, 4),
    ('14', 3, 111, 4),
    ('15', 3, 108, 4),
    ('16', 3, 132, 4),
    ('17', 5, 256, 4),
    ('18', 3, 125, 4);
