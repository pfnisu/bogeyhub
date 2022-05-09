const mysql = require('mysql');
const settings = require('./db_settings.js');
const pool = mysql.createPool(settings);

module.exports = {
    // Return the new id if insert succeeded
    save: (comp) => {
        return new Promise((resolve, reject) => {
            pool.query('insert into competition set ?', comp, (err, res) => {
                if (err) reject(err);
                else resolve(res.insertId);
            });
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
    // Return an array of course objects, can be empty
    findCourses: () => {
        return new Promise((resolve, reject) => {
            pool.query(
                'select * from course',
                (err, res) => {
                    console.log(res);
                    if (err) reject(err);
                    else resolve(res);
                }
            );
        });
    },
    // Return an array of holes, can be empty
    findHoles: (id) => {
        return new Promise((resolve, reject) => {
            pool.query(
                'select * from hole where course_id = ?',
                [id],
                (err, res) => {
                    console.log(res);
                    if (err) reject(err);
                    else resolve(res);
                }
            );
        });
    },
};
