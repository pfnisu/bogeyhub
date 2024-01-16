const db = require('./connection.js')

module.exports = {
    // Return an array of course objects, can be empty
    readCourses: () => {
        return new Promise((resolve, reject) => {
            db.query(
                'select * from course where active = TRUE',
                (err, res) => {
                    if (err) reject(err)
                    else resolve(res.rows)
                }
            )
        })
    },
    // Return an array of holes with course id, can be empty
    readHoles: (id) => {
        return new Promise((resolve, reject) => {
            db.query(
                'select id, name, par, meters from hole where course_id = $1',
                [id],
                (err, res) => {
                    if (err) reject(err)
                    else resolve(res.rows)
                }
            )
        })
    },
}
