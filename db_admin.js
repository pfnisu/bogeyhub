const mysql = require('mysql');
const settings = require('./db_settings.js');
const pool = mysql.createPool(settings);

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
    // Return true if deleted, false if no rows affected
    deleteById: (id) => {
        return new Promise((resolve, reject) => {
            pool.query('delete from competition where id = ?', [id], (err, res) => {
                if (err) reject('Deletion failed.\n' + err);
                else resolve(res.affectedRows !== 0);
            });
        });
    },
};