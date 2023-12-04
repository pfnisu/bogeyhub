const db = require('./connection.js');

module.exports = {
    // Return an array of course objects, can be empty
    allCourses: () => {
        return new Promise((resolve, reject) => {
            db.query(
                'select * from course',
                (err, res) => {
                    if (err) reject(err);
                    else resolve(res.rows);
                }
            );
        });
    },
    // Return an array of holes with course id, can be empty
    holesById: (id) => {
        return new Promise((resolve, reject) => {
            db.query(
                'select id, name, par, meters from hole where course_id = $1',
                [id],
                (err, res) => {
                    if (err) reject(err);
                    else resolve(res.rows);
                }
            );
        });
    },
};
