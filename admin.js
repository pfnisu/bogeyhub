const db = require('./db_admin.js');
const compSchema = require('./schema.js').competition;
const admin = require('express').Router();
const validate = require('jsonschema').validate;

// Get all courses
admin.get('/course', async (req, res) => {
    try {
        let result = await db.findCourses();
        if (result) res.status(200).send(result);
        else res.status(404).send('No courses found');
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get holes for a course
admin.get('/hole/:id([0-9]+)', async (req, res) => {
    try {
        let result = await db.findHoles(req.params.id);
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
admin.delete('/:id([0-9]+)', async (req, res) => {
    try {
        let success = await db.deleteComp(req.params.id);
        if (success) res.status(204).end(); // Delete ok, 204 No Content
        else res.status(404).send('Id not found'); // Nothing deleted
    } catch (err) {
        res.status(500).send(err);
    }
});

// Partial update with PATCH
admin.patch('/:id([0-9]+)', async (req, res) => {
    // Return 400 Bad Request if patched obj doesn't validate
    if (validate(req.body, compSchema).errors.length > 0) {
        res.status(400).send('Invalid competition data');
    } else {
        // Try to update db row that has id
        let success = await db.updateComp(req.params.id, req.body);
        if (success) res.status(204).end(); // Update ok, 204 No Content
        else res.status(404).send('Id not found');
    }
});

module.exports = admin;
