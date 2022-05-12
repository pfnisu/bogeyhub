const mysql = require('mysql');
const settings = require('./db_settings.js');
const pool = mysql.createPool(settings);

module.exports = {
    // Add competition, return the new id if insert succeeded
    addComp: (comp) => {
        return new Promise((resolve, reject) => {
            pool.query('insert into competition set ?', comp, (err, res) => {
                if (err) reject(err);
                else resolve(res.insertId);
            });
        });
    },
    // Add round for a comp, return the new id if insert succeeded
    addRound: (round) => {
        return new Promise((resolve, reject) => {
            pool.query('insert into round set ?', round, (err, res) => {
                if (err) reject(err);
                else resolve(res.insertId);
            });
        });
    },
    // Return true if groups inserted, false if no rows affected
    addGroups: (id, groups) => {
        let rows = [];
        // Transpose groups into two-dimensional array
        groups.forEach((group, g_num) =>
            group.forEach((uid, s_pos) =>
                rows.push([g_num + 1, s_pos + 1, uid, id])
            )
        );
        return new Promise((resolve, reject) => {
            pool.query(
                'insert into grp(group_number, start_position, user_id, round_id) ' +
                'values ?',
                [rows],
                (err, res) => {
                    if (err) reject(err);
                    else resolve(res.affectedRows !== 0);
                }
            );
        });
    },
    // Return true if updated, false if no rows affected
    updateComp: (id, comp) => {
        return new Promise((resolve, reject) => {
            pool.query('update competition set ? where id = ?', [comp, id], (err, res) => {
                if (err) reject(err);
                else resolve(res.affectedRows !== 0);
            });
        });
    },
    // Return true if deleted, false if no rows affected
    deleteComp: (id) => {
        return new Promise((resolve, reject) => {
            pool.query('delete from competition where id = ?', [id], (err, res) => {
                if (err) reject(err);
                else resolve(res.affectedRows !== 0);
            });
        });
    },
};
