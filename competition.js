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
                // TODO Null-pad
                result.forEach(el => el.user === usr && score.push(el.result)),
                arr.push({
                    user: usr,
                    scores: score,
                    //scores: result.map(el => el.user === usr ? el.result : null),
                });
            });
            res.status(200).send(arr);
        }
        else res.status(404).send('Id not found');
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get groups for competition id
competition.get('/group/:id([0-9]+)', async (req, res) => {
    try {
        let result = await db.groupsById(req.params.id);
        if (result) res.status(200).send(result);
        else res.status(404).send('Id not found');
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = competition;
