const db = require('./db/competition.js')
const db_course = require('./db/course.js')
const compSchema = require('./schema.js').competition
const competition = require('express').Router()
const validate = require('jsonschema').validate

// Handle requests relating to competition data

// Root returns all competitions, filtered by optional parameters
competition.get('/', async (req, res) => {
    try {
        let params = [] // TODO
        let result = await db.findAll(params)
        res.status(200).send(result) // OK
    } catch (err) {
        res.status(500).send(err) // 500 Internal Server Error
    }
})

// Get competition by id
competition.get('/:id([0-9]+)', async (req, res) => {
    try {
        let result = await db.findById(req.params.id)
        if (result) res.status(200).send(result)
        else res.status(404).send('Id not found')
    } catch (err) {
        res.status(500).send(err)
    }
})

// Get scores by competition id
competition.get('/scores/:id([0-9]+)', async (req, res) => {
    try {
        let rounds = await db.roundsById(req.params.id)
        if (rounds) {
            for (const round of rounds) {
                let holes = await db_course.holesById(round.course_id)

                // Add holes to round data
                if (holes) {
                    round.holes = holes
                    round.par = round.holes.rows.reduce((sum, hole) => sum += hole.par, 0)
                } else res.status(404).send('Holes not found')
            }
            let scores = await db.resultsById(req.params.id)
            // Transpose row-oriented scores to per-player data
            let set = new Set(scores.map(row => row.user_id))
            rounds[0].results = []

            set.forEach(uid => {
                let name, score = []
                scores.forEach(row => row.user_id === uid &&
                    score.push(row.result) &&
                    (name = row.user_name))

                // Null-pad incomplete scores
                while (score.length < rounds[0].holes.rows.length) score.push(null)
                const total = score.reduce((sum, hole) => sum += hole)
                rounds[0].results.push({
                    user: {id: uid, name: name},
                    scores: score,
                    total: total,
                    // Use pars for rest of the round to calculate +/- for incomplete round
                    relative: rounds[0].holes.rows
                        .slice(score.filter(hole => hole).length)
                        .reduce((sum, hole) => sum += hole.par, total - rounds[0].par),
                })
            })
            // Sort results by total score
            rounds[0].results.sort((a, b) => a.total - b.total)

            res.status(200).send(rounds)
        }
        else res.status(404).send('Id not found')
    } catch (err) {
        res.status(500).send(err)
    }
})


// Get results by competition id
competition.get('/result/:id([0-9]+)', async (req, res) => {
    try {
        let result = await db.resultsById(req.params.id)
        if (result) {
            // Transpose row-oriented scores to per-player data
            let set = new Set(result.map(row => row.user_id))
            let arr = []
            set.forEach(uid => {
                let name, score = []
                result.forEach(row => row.user_id === uid &&
                    score.push(row.result) &&
                    (name = row.user_name))
                arr.push({
                    user: {id: uid, name: name},
                    scores: score,
                })
            })
            res.status(200).send(arr)
        }
        else res.status(404).send('Id not found')
    } catch (err) {
        res.status(500).send(err)
    }
})

// Get registrations for competition id
competition.get('/registrations/:id([0-9]+)', async (req, res) => {
    try {
        let result = await db.registrationsById(req.params.id)
        if (result) res.status(200).send(result)
        else res.status(404).send('Id not found')
    } catch (err) {
        res.status(500).send(err)
    }
})

// Get rounds for competition id
competition.get('/rounds/:id([0-9]+)', async (req, res) => {
    try {
        let rounds = await db.roundsById(req.params.id)
        if (rounds) {
            for (const round of rounds) {
                let holes = await db_course.holesById(round.course_id)
                // Add holes to round data
                if (holes) round.holes = holes
                else res.status(404).send('Holes not found')
            }
            res.status(200).send(rounds)
        } else res.status(404).send('Id not found')
    } catch (err) {
        res.status(500).send(err)
    }
})

// Get groups for round id
competition.get('/groups/:id([0-9]+)', async (req, res) => {
    try {
        let groups = await db.groupsById(req.params.id)
        let result = []
        if (groups) {
            // Get unique group numbers
            let set = new Set(groups.map(g => g.group_number))
            // Push sorted names into corresponding group array
            set.forEach(gNum =>
                result.push(groups.filter(g => g.group_number == gNum)
                    .sort((a, b) => a.start_position < b.start_position)
                    .map(row => { return { id: row.id, name: row.user }})
                )
            )
            res.status(200).send(result)
        } else res.status(404).send('Id not found')
    } catch (err) {
        res.status(500).send(err)
    }
})

module.exports = competition
