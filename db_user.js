const mysql = require('mysql');
const settings = require('./db_settings.js');
const pool = mysql.createPool(settings);

module.exports = {
    // Return name and id if success, else false
    login: (user) => {
        return new Promise((resolve, reject) => {
            pool.query(
                'select id, name from user where name = ? and password = ?',
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
                'insert into registration(division_id, user_id, competition_id) ' +
                'values ((select id from division where name = ?), ?, ?)',
                [reg.division, reg.user_id, reg.competition_id], (err, res) => {
                    if (err) reject(err.code);
                    else resolve(res.affectedRows === 1);
                }
            );
        });
    },
    // Return an array of competition objects, can be empty
    findRegistrations: (id) => {
        return new Promise((resolve, reject) => {
            pool.query(
                'select competition.id, start_date, end_date, ' +
                'competition.name, venue, max_users, competition.info, ' +
                'phase.name as phase from competition ' +
                'inner join phase on phase.id = competition.phase_id ' +
                'inner join registration on competition.id = registration.competition_id ' +
                'inner join user on user.id = registration.user_id ' +
                'where user.id = ?',
                [id],
                (err, res) => {
                    console.log(res);
                    if (err) reject(err);
                    else resolve(res);
                }
            );
        });
    },
    // Return the new id if insert succeeded
    save: (user) => {
        return new Promise((resolve, reject) => {
            pool.query('insert into user set ?', user, (err, res) => {
                if (err) reject(err);
                else resolve(res.insertId);
            });
        });
    },
    // Return true if updated, false if no rows affected
    update: (id, user) => {
        return new Promise((resolve, reject) => {
            pool.query('update user set ? where id = ?', [user, id], (err, res) => {
                if (err) reject(err);
                else resolve(res.affectedRows !== 0);
            });
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
