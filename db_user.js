const mysql = require('mysql');
const settings = require('./db_settings.js');
const pool = mysql.createPool(settings);

module.exports = {
    // Return name and id if success, else false
    login: (user) => {
        return new Promise((resolve, reject) => {
            pool.query(
                'select user.id, user.name, birth_year, sex.name as sex, role.name as role ' +
                'from user ' +
                'left join sex on sex.id = sex_id ' + // sex can be empty => left join
                'inner join role on role.id = role_id ' +
                'where user.name = ? and password = ?',
                [user.name, user.password],
                (err, res) => {
                    if (err) reject(err);
                    else if (res.length === 0) resolve(false); // No matching user
                    else resolve(res[0]);
                }
            );
        });
    },
    // Add user to competition: return the new id if insert succeeded
    register: (reg) => {
        return new Promise((resolve, reject) => {
            pool.query(
                'insert into registration set ' +
                'division_id = (select id from division where name = ?), ' +
                'user_id = ?, competition_id = ?',
                [reg.division, reg.user_id, reg.competition_id], (err, res) => {
                    if (err) reject(err.code);
                    else resolve(res.affectedRows === 1);
                }
            );
        });
    },
    // Return true if deleted, false if no rows affected
    deleleReg: (uid, cid) => {
        return new Promise((resolve, reject) => {
            pool.query(
                'delete from registration where user_id = ? and competition_id = ?',
                [uid, cid],
                (err, res) => {
                    if (err) reject(err);
                    else resolve(res.affectedRows !== 0);
                }
            );
        });
    },
    // Return an array of competition objects, can be empty
    findRegistrations: (id) => {
        return new Promise((resolve, reject) => {
            pool.query(
                'select competition_id as id from registration ' +
                'inner join user on user.id = registration.user_id ' +
                'where user.id = ?',
                [id],
                (err, res) => {
                    if (err) reject(err);
                    else resolve(res);
                }
            );
        });
    },
    // Return the new id if insert succeeded
    saveUser: (user) => {
        return new Promise((resolve, reject) => {
            pool.query(
                'insert into user set name = ?, password = ?, ' +
                'role_id = (select id from role where name = ?)',
                [user.name, user.password, user.role], (err, res) => {
                    if (err) reject(err);
                    else resolve(res.insertId);
                }
            );
        });
    },
    // Return the new id if insert succeeded
    saveScores: (scores) => {
        return new Promise((resolve, reject) => {
            // Transpose scores into two-dimensional array
            let rows = scores.reduce((sum, row) => [...sum, Object.values(row)], []);
            pool.query(
                'insert into score(result, hole_id, user_id, round_id) ' +
                'values ?',
                [rows],
                (err, res) => {
                    if (err) reject(err);
                    else resolve(res.insertId);
                }
            );
        });
    },
    // Return true if updated, false if no rows affected
    updateUser: (id, user) => {
        return new Promise((resolve, reject) => {
            let columns = [user.birth_year, user.sex, id];
            // Only update pw if it's included in user data
            user.password && columns.unshift(user.password);

            pool.query(
                'update user set ' +
                (user.password ? 'password = ?, ' : '') +
                'birth_year = ?, sex_id = (select id from sex where name = ?) ' +
                'where id = ?',
                columns, (err, res) => {
                    if (err) reject(err);
                    else resolve(res.affectedRows !== 0);
                }
            );
        });
    },
    // Return true if deleted, false if no rows affected
    del: (id) => {
        return new Promise((resolve, reject) => {
            pool.query('delete from user where id = ?', [id], (err, res) => {
                if (err) reject(err);
                else resolve(res.affectedRows !== 0);
            });
        });
    },
};
