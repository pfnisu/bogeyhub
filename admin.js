const db = require('./db_admin.js');
const compSchema = require('./schema.js').competition;
const admin = require('express').Router();
const validate = require('jsonschema').validate;

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
        let success = await db.deleteById(req.params.id);
        if (success) res.status(204).end(); // Delete ok, 204 No Content
        else res.status(404).send('Id not found'); // Nothing deleted
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = admin;
