const db = require('./connection.js')

module.exports = {
    // Add competition, return the new id if insert succeeded
    addComp: (comp) => {
        return new Promise((resolve, reject) => {
            db.query(
                'insert into competition (start_date, name, phase_id) ' +
                'values ($1, $2, $3) returning id',
                [...Object.values(comp)],
                (err, res) => {
                    if (err) reject(err)
                    else resolve(res.rows[0].id)
                }
            )
        })
    },
    // Add round for a comp, return the new id if insert succeeded
    addRound: (round) => {
        return new Promise((resolve, reject) => {
            db.query(
                'insert into round (name, start_time, course_id, competition_id) ' +
                'values ($1, $2, $3, $4) returning id',
                [...Object.values(round)],
                (err, res) => {
                    if (err) reject(err)
                    else resolve(res.rows[0].id)
                }
            )
        })
    },
    // Return true if groups inserted, false if no rows affected
    addGroups: (id, groups) => {
        // Transpose groups into column-based array
        let cols = [[], [], groups.flat(), []]
        groups.forEach((g, gnum) => {
            g.forEach((_, spos) => {
                cols[0].push(gnum + 1)
                cols[1].push(spos + 1)
                cols[3].push(id)
            })
        })
        return new Promise((resolve, reject) => {
            db.query(
                'insert into grp (group_number, start_position, user_id, round_id) ' +
                'select * from unnest($1::int[], $2::int[], $3::int[], $4::int[])',
                cols,
                (err, res) => {
                    if (err) reject(err)
                    else resolve(res.rowCount !== 0)
                }
            )
        })
    },
    // Return true if updated, false if no rows affected
    updateComp: (id, comp) => {
        return new Promise((resolve, reject) => {
            db.query(
                'update competition set ' +
                'start_date = $2, name = $3, venue = $4, info = $5, phase_id = $6 ' +
                'where id = $1',
                [id, ...Object.values(comp)],
                (err, res) => {
                    if (err) reject(err)
                    else resolve(res.rowCount === 1)
                }
            )
        })
    },
    // Return true if deleted, false if no rows affected
    deleteComp: (id) => {
        return new Promise((resolve, reject) => {
            db.query('delete from competition where id = $1',
                [id], (err, res) => {
                    if (err) reject(err)
                    else resolve(res.rowCount === 1)
                }
            )
        })
    },
    // Return true if deleted, false if no rows affected
    deleteRound: (id) => {
        return new Promise((resolve, reject) => {
            db.query('delete from round where id = $1',
                [id], (err, res) => {
                    if (err) reject(err)
                    else resolve(res.rowCount === 1)
                }
            )
        })
    },
}
