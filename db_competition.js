const mysql = require('mysql');
const settings = require('./db_settings.js');
const pool = mysql.createPool(settings);

module.exports = {
    // Return an array of competition objects, can be empty
    findAll: (params) => {
        return new Promise((resolve, reject) => {
            pool.query(
                'select competition.id, start_date, end_date, ' +
                'competition.name, venue, max_users, competition.info, ' +
                'phase.name as phase from competition ' +
                'inner join phase on phase.id = competition.phase_id',
                (err, res) => {
                    if (err) reject(err);
                    else resolve(res);
                }
            );
        });
    },
    // Query round result data, result in columnar form for scalability
    resultsById: (id) => {
        return new Promise((resolve, reject) => {
            pool.query(
                'select hole, result, user.name as user from competition ' +
                'inner join round on competition.id = round.competition_id ' +
                'inner join score on round.id = score.round_id ' +
                'inner join user on user.id = score.user_id ' +
                'where competition.id = ?',
                [id],
                (err, res) => {
                    if (err) reject(err);
                    else resolve(res);
                }
            );
        });
    },
    // Get registrations for a competition
    registrationsById: (id) => {
        return new Promise((resolve, reject) => {
            pool.query(
                'select time, division.name as division, user.name as user from registration ' +
                'inner join user on user.id = registration.user_id ' +
                'inner join division on division.id = registration.division_id ' +
                'where competition_id = ?',
                [id],
                (err, res) => {
                    if (err) reject(err);
                    else resolve(res);
                }
            );
        });
    },
    // Get groups for a round
    groupsById: (id) => {
        return new Promise((resolve, reject) => {
            pool.query(
                'select group_number, start_position, user.name as user from groups ' +
                'inner join user on user.id = groups.user_id ' +
                'where round_id = ?',
                [id],
                (err, res) => {
                    if (err) reject(err);
                    else resolve(res);
                }
            );
        });
    },
    // Return a competition object, or null if id doesn't exist
    findById: (id) => {
        return new Promise((resolve, reject) => {
            pool.query(
                'select * from competition where id = ?',
                [id],
                (err, res) => {
                    if (err) reject(err);
                    else if (res.length === 0) resolve(null);
                    else resolve(res[0]);
                }
            );
        });
    },
};
