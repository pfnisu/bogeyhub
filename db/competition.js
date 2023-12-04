const db = require('./connection.js')

module.exports = {
    // Return an array of competition objects, can be empty
    findAll: (params) => {
        return new Promise((resolve, reject) => {
            db.query(
                'select competition.id, start_date, end_date, ' +
                'competition.name, venue, max_users, competition.info, ' +
                'phase.name as phase from competition ' +
                'inner join phase on phase.id = competition.phase_id ' +
                'order by start_date desc',
                (err, res) => {
                    if (err) reject(err)
                    else resolve(res.rows)
                }
            )
        })
    },
    // Find round result data, result in row form for scalability
    resultsById: (id) => {
        return new Promise((resolve, reject) => {
            db.query(
                'select hole_id, result, usr.id as user_id, usr.name as user_name ' +
                'from competition ' +
                'inner join round on competition.id = round.competition_id ' +
                'inner join score on round.id = score.round_id ' +
                'inner join usr on usr.id = score.user_id ' +
                'where competition.id = $1',
                [id],
                (err, res) => {
                    if (err) reject(err)
                    else resolve(res.rows)
                }
            )
        })
    },
    // Find registrations for a competition
    registrationsById: (id) => {
        return new Promise((resolve, reject) => {
            db.query(
                'select time, division.name as division, usr.name as user, usr.id as id ' +
                'from registration ' +
                'inner join usr on usr.id = registration.user_id ' +
                'inner join division on division.id = registration.division_id ' +
                'where competition_id = $1 ' +
                'order by time asc',
                [id],
                (err, res) => {
                    if (err) reject(err)
                    else resolve(res.rows)
                }
            )
        })
    },
    // Find rounds of a competition
    roundsById: (id) => {
        return new Promise((resolve, reject) => {
            db.query(
                'select round.id as id, round.name as round, start_time, course.name as course, course.id as course_id ' +
                'from round ' +
                'inner join course on course.id = round.course_id ' +
                'where competition_id = $1',
                [id],
                (err, res) => {
                    if (err) reject(err)
                    else resolve(res.rows)
                }
            )
        })
    },
    // Find groups of a round
    groupsById: (id) => {
        return new Promise((resolve, reject) => {
            db.query(
                'select group_number, start_position, usr.name as user, usr.id as id ' +
                'from grp ' +
                'inner join usr on usr.id = grp.user_id ' +
                'where round_id = $1' +
                'order by start_position asc',
                [id],
                (err, res) => {
                    if (err) reject(err)
                    else resolve(res.rows)
                }
            )
        })
    },
    // Return a competition object, or null if id doesn't exist
    findById: (id) => {
        return new Promise((resolve, reject) => {
            db.query(
                'select * from competition where id = $1',
                [id],
                (err, res) => {
                    if (err) reject(err)
                    else if (res.rowCount === 0) resolve(null)
                    else resolve(res.rows[0])
                }
            )
        })
    },
}
