-- Insert dummy data into scoring database

INSERT INTO sex(name) VALUES
    ('male'),
    ('female');
INSERT INTO user(name, password) VALUES
    ('admin', 'admin');
INSERT INTO phase(name) VALUES
    ('announce'),
    ('registration'),
    ('closed'),
    ('active'),
    ('complete');
INSERT INTO competition(date, name, phase_id) VALUES
    ('2022-05-01', 'Test competition', 1);
