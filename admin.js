const db = require('./db_admin.js');
const db_course = require('./db_course.js');
const compSchema = require('./schema.js').competition;
const roundSchema = require('./schema.js').round;
const groupSchema = require('./schema.js').group;
const admin = require('express').Router();
const validate = require('jsonschema').validate;

// Get all courses
admin.get('/course', async (req, res) => {
    try {
        let result = await db_course.allCourses();
        if (result) res.status(200).send(result);
        else res.status(404).send('No courses found');
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get holes for a course
admin.get('/hole/:id([0-9]+)', async (req, res) => {
    try {
        let result = await db_course.holesById(req.params.id);
        if (result) res.status(200).send(result);
        else res.status(404).send('No holes found');
    } catch (err) {
        res.status(500).send(err);
    }
});

// Add new competition with POST
admin.post('/', async (req, res) => {
    // Return 400 Bad Request if invalid competition data
    if (validate(req.body, compSchema).errors.length) {
        res.status(400).send('Invalid competition data');
    } else {
        try {
            let result = {
                id: await db.addComp(req.body),
                ...req.body,
            };
            res.status(201).send(result); // 201 Created
        } catch (err) {
            res.status(500).send(err);
        }
    }
});

// Add round for competition with POST
admin.post('/round/:id([0-9]+)', async (req, res) => {
    let body = {
        ...req.body,
        competition_id: Number(req.params.id),
    };
    // Return 400 Bad Request if invalid round data
    if (validate(body, roundSchema).errors.length) {
        res.status(400).send('Invalid round data');
    } else {
        try {
            let result = {
                id: await db.addRound(body),
            };
            res.status(201).send(result); // 201 Created
        } catch (err) {
            res.status(500).send(err);
        }
    }
});

// Add groups for a round
admin.post('/group/:id([0-9]+)', async (req, res) => {
    // Return 400 Bad Request if invalid group data
    if (validate(body, groupSchema).errors.length) {
        res.status(400).send('Invalid group data');
    } else {
        try {
            let result = {
                id: await db.addGroups(req.params.id, req.body),
            };
            res.status(201).send(result); // 201 Created
        } catch (err) {
            res.status(500).send(err);
        }
    }
});

// Delete competition matching url param
admin.delete('/:id([0-9]+)', async (req, res) => {
    try {
        let success = await db.deleteComp(req.params.id);
        if (success) res.status(204).end(); // Delete ok, 204 No Content
        else res.status(404).send('Id not found'); // Nothing deleted
    } catch (err) {
        res.status(500).send(err);
    }
});

// Delete round matching url param
admin.delete('/round/:id([0-9]+)', async (req, res) => {
    try {
        let success = await db.deleteRound(req.params.id);
        if (success) res.status(204).end(); // Delete ok, 204 No Content
        else res.status(404).send('Id not found'); // Nothing deleted
    } catch (err) {
        res.status(500).send(err);
    }
});

// Partial update with PATCH
admin.patch('/:id([0-9]+)', async (req, res) => {
    let body = {
        ...req.body,
        phase_id: Number(req.body.phase_id),
    };
    // Return 400 Bad Request if patched obj doesn't validate
    if (validate(body, compSchema).errors.length > 0) {
        res.status(400).send('Invalid competition data');
    } else {
        // Try to update db row that has id
        let success = await db.updateComp(req.params.id, body);
        if (success) res.status(204).end(); // Update ok, 204 No Content
        else res.status(404).send('Id not found');
    }
});

module.exports = admin;
