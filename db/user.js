const db = require('./connection.js');

module.exports = {
    // Return name and id if success, else false
    login: (user) => {
        return new Promise((resolve, reject) => {
            db.query(
                'select usr.id, usr.name, birth_year, sex.name as sex, role.name as role ' +
                'from usr ' +
                'left join sex on sex.id = sex_id ' + // sex can be empty => left join
                'inner join role on role.id = role_id ' +
                'where usr.name = $1 and password = $2',
                [user.name, user.password],
                (err, res) => {
                    if (err) reject(err);
                    else if (res.rowCount === 0) resolve(false); // No matching user
                    else resolve(res.rows[0]);
                }
            );
        });
    },
    // Add user to competition: return the new id if insert succeeded
    register: (reg) => {
        return new Promise((resolve, reject) => {
            db.query(
                'insert into registration set ' +
                'division_id = (select id from division where name = $1), ' +
                'user_id = $2, competition_id = $3',
                [reg.division, reg.user_id, reg.competition_id], (err, res) => {
                    if (err) reject(err.code);
                    else resolve(res.rowCount === 1);
                }
            );
        });
    },
    // Return true if deleted, false if no rows affected
    deleleReg: (uid, cid) => {
        return new Promise((resolve, reject) => {
            db.query(
                'delete from registration where user_id = $1 and competition_id = $2',
                [uid, cid],
                (err, res) => {
                    if (err) reject(err);
                    else resolve(res.rowCount !== 0);
                }
            );
        });
    },
    // Return an array of competition objects, can be empty
    findRegistrations: (id) => {
        return new Promise((resolve, reject) => {
            db.query(
                'select competition_id as id from registration ' +
                'inner join usr on usr.id = registration.user_id ' +
                'where usr.id = $1',
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
            db.query(
                'insert into usr (name, password, role_id) ' +
                'values ($1, $2, (select id from role where name = $3))' +
                'returning id',
                [user.name, user.password, user.role], (err, res) => {
                    if (err) reject(err);
                    else resolve(res.rows[0].id);
                }
            );
        });
    },
    // Return the new id if insert succeeded
    saveScores: (scores) => {
        return new Promise((resolve, reject) => {
            // Transpose scores into two-dimensional array
            let rows = scores.reduce((sum, row) => [...sum, Object.values(row)], []);
            db.query(
                'replace into score(result, hole_id, user_id, round_id) ' +
                'values $1',
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
            user.password && columns.push(user.password);

            db.query(
                'update usr set ' +
                (user.password ? 'password = $4, ' : '') +
                'birth_year = $1, sex_id = (select id from sex where name = $2) ' +
                'where id = $3',
                columns,
                (err, res) => {
                    if (err) reject(err);
                    else resolve(res.affectedRows !== 0);
                }
            );
        });
    },
    // Return true if deleted, false if no rows affected
    del: (id) => {
        return new Promise((resolve, reject) => {
            db.query('delete from usr where id = $1', [id], (err, res) => {
                if (err) reject(err);
                else resolve(res.affectedRows !== 0);
            });
        });
    },
};
