const db = require('./db_competition.js');
const compSchema = require('./schema.js').competition;
const competition = require('express').Router();
const validate = require('jsonschema').validate;

// Root returns all competitions, filtered by optional parameters
competition.get('/', async (req, res) => {
    try {
        let params = []; // TODO
        let result = await db.findAll(params);
        res.status(200).send(result); // OK
    } catch (err) {
        res.status(500).send(err); // 500 Internal Server Error
    }
});

// Get competition by id
competition.get('/:id([0-9]+)', async (req, res) => {
    try {
        let result = await db.findById(req.params.id);
        if (result) res.status(200).send(result);
        else res.status(404).send('Id not found');
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get results by competition id
competition.get('/result/:id([0-9]+)', async (req, res) => {
    try {
        let result = await db.resultsById(req.params.id);
        if (result) {
            // Transpose column-oriented scores to per-player data
            let set = new Set(result.map(obj => obj.user));
            let arr = [];
            set.forEach(usr => {
                let score = [];
                result.forEach(el => el.user === usr && score.push(el.result)),
                arr.push({
                    user: usr,
                    scores: score,
                });
            });
            res.status(200).send(arr);
        }
        else res.status(404).send('Id not found');
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get registrations for competition id
competition.get('/registrations/:id([0-9]+)', async (req, res) => {
    try {
        let result = await db.registrationsById(req.params.id);
        if (result) res.status(200).send(result);
        else res.status(404).send('Id not found');
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get rounds for competition id
competition.get('/rounds/:id([0-9]+)', async (req, res) => {
    try {
        let rounds = await db.roundsById(req.params.id);
        if (rounds) {
            for (let i = 0; i<rounds.length;i++) {
                let holes = await db.holesById(rounds[i].course_id);
                // Transpose column-oriented hole data to arrays
                if (holes) {
                    rounds[i].holes = [];
                    rounds[i].pars = [];
                    holes.forEach((h) => {
                        rounds[i].holes.push(h.name);
                        rounds[i].pars.push(h.par);
                    });
                } else res.status(404).send('Holes not found');
            }
            res.status(200).send(rounds);
        } else res.status(404).send('Id not found');
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get groups for round id
competition.get('/groups/:id([0-9]+)', async (req, res) => {
    try {
        let result = await db.groupsById(req.params.id);
        if (result) res.status(200).send(result);
        else res.status(404).send('Id not found');
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = competition;
