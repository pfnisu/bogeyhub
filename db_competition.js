require('dotenv').config();
const mysql = require('mysql');

const pool = mysql.createPool({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    connectionLimit: 10,
});

module.exports = {
    // Return the new id if insert succeeded
    save: (comp) => {
        return new Promise((resolve, reject) => {
            pool.query('insert into competition set ?', comp, (err, res) => {
                if (err) reject('Saving to DB failed.\n' + err);
                else resolve(res.insertId);
            });
        });
    },
    // Return an array of competition objects, can be empty
    findAll: (params) => {
        return new Promise((resolve, reject) => {
            pool.query(
                'select competition.id, start_date, end_date, ' +
                'competition.name, venue, max_users, competition.info, ' +
                'phase.name as phase from competition ' +
                'inner join phase on phase.id = competition.phase_id',
                (err, res) => {
                    if (err) reject('DB query failed.\n' + err);
                    else resolve(res);
                }
            );
        });
    },
    // Return true if deleted, false if no rows affected
    deleteById: (id) => {
        return new Promise((resolve, reject) => {
            pool.query('delete from competition where id = ?', [id], (err, res) => {
                if (err) reject('Deletion failed.\n' + err);
                else resolve(res.affectedRows !== 0);
            });
        });
    },
    // Return a competition object, or null if id doesn't exist
    findById: (id) => {
        return new Promise((resolve, reject) => {
            pool.query(
                'select * from competition where id = ?',
                [id],
                (err, res) => {
                    if (err) reject('DB query failed.\n' + err);
                    else if (res.length === 0) resolve(null);
                    else resolve(res[0]);
                }
            );
        });
    },
};
