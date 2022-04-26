const db = require('./db_competition.js');
const competition = require('express').Router();
const validate = require('jsonschema').validate;

// Define valid spec for competition object
const compSchema = {
    type: 'object',
    properties: {
        start_date: { type: 'string', format: 'date' },
        end_date: { type: 'string', format: 'date' },
        name: { type: 'string', minLength: 1, maxLength: 100 },
        venue: { type: 'string', minLength: 1, maxLength: 100 },
        max_users: { type: 'integer', minimum: 1 },
        info: { type: 'string'},
        phase_id: { type: 'integer', minimum: 1, maximum: 5 },
    },
    required: ['start_date', 'name', 'phase_id'],
    maxProperties: 4,
};

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

// Add new competition with POST
competition.post('/', async (req, res) => {
    // Return 400 Bad Request if invalid competition data
    if (validate(req.body, compSchema).errors.length) {
        res.status(400).send('Invalid competition data');
    } else {
        try {
            let result = {
                id: await db.save(req.body),
                ...req.body,
            };
            res.status(201).send(result); // 201 Created
        } catch (err) {
            res.status(500).send(err);
        }
    }
});

// Delete competition matching url param
competition.delete('/:id([0-9]+)', async (req, res) => {
    try {
        let success = await db.deleteById(req.params.id);
        if (success) res.status(204).end(); // Delete ok, 204 No Content
        else res.status(404).send('Id not found'); // Nothing deleted
    } catch (err) {
        res.status(500).send(err);
    }
});
module.exports = competition;
