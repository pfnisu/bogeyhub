const mysql = require('mysql');
const settings = require('./db_settings.js');
const pool = mysql.createPool(settings);

module.exports = {
    // Return an array of course objects, can be empty
    allCourses: () => {
        return new Promise((resolve, reject) => {
            pool.query(
                'select * from course',
                (err, res) => {
                    if (err) reject(err);
                    else resolve(res);
                }
            );
        });
    },
    // Return an array of holes with course id, can be empty
    holesById: (id) => {
        return new Promise((resolve, reject) => {
            pool.query(
                'select id, name, par from hole where course_id = ?',
                [id],
                (err, res) => {
                    if (err) reject(err);
                    else resolve(res);
                }
            );
        });
    },
};
