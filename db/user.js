const db = require('./connection.js')

module.exports = {
    // Return the new id if insert succeeded
    createUser: (user) => {
        return new Promise((resolve, reject) => {
            db.query(
                'insert into usr (name, password, role_id) ' +
                'values ($1, $2, (select id from role where name = $3))' +
                'returning id',
                [user.name, user.password, user.role], (err, res) => {
                    if (err) reject(err)
                    else resolve(res.rows[0].id)
                }
            )
        })
    },
    // Add user to competition: return the new id if insert succeeded
    createReg: (reg) => {
        return new Promise((resolve, reject) => {
            db.query(
                'insert into registration (user_id, division_id, competition_id) ' +
                'values ($1, (select id from division where name = $2), $3)',
                [...Object.values(reg)],
                (err, res) => {
                    if (err) reject(err.code)
                    else resolve(res.rowCount === 1)
                }
            )
        })
    },
    // Return name and id if success, else false
    readUser: (user) => {
        return new Promise((resolve, reject) => {
            db.query(
                'select usr.id, usr.name, birth_year, sex.name as sex, role.name as role ' +
                'from usr ' +
                'left join sex on sex.id = sex_id ' + // sex can be empty => left join
                'inner join role on role.id = role_id ' +
                'where usr.name = $1 and password = $2',
                [user.name, user.password],
                (err, res) => {
                    if (err) reject(err)
                    else if (res.rowCount === 0) resolve(false) // No matching user
                    else resolve(res.rows[0])
                }
            )
        })
    },
    // Return an array of competition objects, can be empty
    readRegs: (id) => {
        return new Promise((resolve, reject) => {
            db.query(
                'select competition_id as id from registration ' +
                'inner join usr on usr.id = registration.user_id ' +
                'where usr.id = $1',
                [id],
                (err, res) => {
                    if (err) reject(err)
                    else resolve(res.rows)
                }
            )
        })
    },
    // Return true if updated, false if no rows affected
    updateUser: (id, user) => {
        return new Promise((resolve, reject) => {
            let columns = [user.birth_year, user.sex, id]
            // Only update pw if it's included in user data
            user.password && columns.push(user.password)
            db.query(
                'update usr set ' +
                (user.password ? 'password = $4, ' : '') +
                'birth_year = $1, sex_id = (select id from sex where name = $2) ' +
                'where id = $3',
                columns,
                (err, res) => {
                    if (err) reject(err)
                    else resolve(res.rowCount === 1)
                }
            )
        })
    },
    // Return true if inserted or updated, false if no rows affected
    updateScores: (scores) => {
        return new Promise((resolve, reject) => {
            // Transpose scores into two-dimensional array
            let cols = [[], [], [], []]
            scores.forEach((s) => {
                cols[0].push(s.result)
                cols[1].push(s.hole_id)
                cols[2].push(s.user_id)
                cols[3].push(s.round_id)
            })
            // TODO merge ...
            db.query(
                'insert into score (result, hole_id, user_id, round_id) ' +
                'select * from unnest($1::int[], $2::int[], $3::int[], $4::int[]) ' +
                'on conflict (hole_id, user_id, round_id) ' +
                'do update set result = excluded.result', // excluded is a builtin
                cols,
                (err, res) => {
                    if (err) reject(err)
                    else resolve(res.rowCount !== 0)
                }
            )
        })
    },
    // Return true if deleted, false if no rows affected
    deleteUser: (id) => {
        return new Promise((resolve, reject) => {
            db.query('delete from usr where id = $1', [id], (err, res) => {
                if (err) reject(err)
                else resolve(res.rowCount === 1)
            })
        })
    },
    // Return true if deleted, false if no rows affected
    deleteReg: (uid, cid) => {
        return new Promise((resolve, reject) => {
            db.query(
                'delete from registration where user_id = $1 and competition_id = $2',
                [uid, cid],
                (err, res) => {
                    if (err) reject(err)
                    else resolve(res.rowCount !== 0)
                }
            )
        })
    },
}
