const db = require('./db_user.js');
const scoreSchema = require('./schema.js').score;
const userSchema = require('./schema.js').user;
const regSchema = require('./schema.js').registration;
const user = require('express').Router();
const validate = require('jsonschema').validate;
const crypto = require('node:crypto');

// Hash password before passing to db
// TODO proper salt + pepper
const hash = (pw) => {
    let secret = 'f58dd2c0a48df3dceed2cdaac3ce8efa94de578db04e529e';
    return crypto.createHmac('sha512', secret).update(pw).digest('hex');
};

// Get registrations by user id
user.get('/:id([0-9]+)', async (req, res) => {
    try {
        let result = await db.findRegistrations(req.params.id);
        if (result) res.status(200).send(result);
        else res.status(404).send('Id not found');
    } catch (err) {
        res.status(500).send(err);
    }
});

// Login
user.post('/login', async (req, res) => {
    let body = {
        ...req.body,
        password: hash(req.body.password),
    };
    // Return 400 Bad Request if invalid user data
    if (validate(body, userSchema).errors.length) {
        res.status(400).send('Invalid account data');
    } else {
        try {
            let result = await db.login(body);
            // If user matched, return name and id
            if (result) res.status(201).send(result);
            else res.status(404).send('User not found');
        } catch (err) {
            res.status(500).send(err);
        }
    }
});

// POST new user account
user.post('/create', async (req, res) => {
    let body = {
        ...req.body,
        password: hash(req.body.password),
        role: 'user', // can only create user roles
    };
    // Return 400 Bad Request if invalid user data
    if (validate(body, userSchema).errors.length) {
        res.status(400).send('Invalid account data');
    } else {
        try {
            let uid = await db.saveUser(body);
            res.status(201).send({...req.body, id: uid}); // 201 Created
        } catch (err) {
            res.status(500).send(err);
        }
    }
});

// POST group scores for a hole
user.post('/score/:id([0-9]+)', async (req, res) => {
    // Return 400 Bad Request if invalid score data
    let body = req.body.map(row => {
        return {
            ...row,
            result: Number(row.result),
            round_id: Number(req.params.id),
        };
    });

    if (body
        .map(row => validate(row, scoreSchema).errors.length)
        .find(errors => errors > 0)) {
        res.status(400).send('Invalid score data');
    } else {
        try {
            let result = await db.saveScores(body);
            if (res) res.status(204).end(); // 204 No Content
        } catch (err) {
            res.status(500).send(err);
        }
    }
});
// Add new registration with POST
user.post('/register/:id([0-9]+)', async (req, res) => {
    let body = {
        competition_id: Number(req.params.id),
        ...req.body,
    };
    // Return 400 Bad Request if invalid user data
    if (validate(body, regSchema).errors.length) {
        res.status(400).send('Invalid registration data');
    } else {
        try {
            let success = await db.register(body);
            if (success) res.status(204).end(); // 204 No Content
            else res.status(404).send('Competition id not found');
        } catch (err) {
            // Duplicate registration attempted, 403 Forbidden
            if (err == 'ER_DUP_ENTRY') res.status(403).send('User already registered');
            else if (err == 'ER_NO_REFERENCED_ROW_2') res.status(404).send('User id not found');
            else res.status(500).send(err);
        }
    }
});

// Delete registration
user.delete('/unregister/:id([0-9]+)', async (req, res) => {
    try {
        let success = await db.deleleReg(req.body.user_id, req.params.id);
        if (success) res.status(204).end(); // Delete ok, 204 No Content
        else res.status(404).send('Id not found'); // Nothing deleted
    } catch (err) {
        res.status(500).send(err);
    }
});

// Delete user matching url param
user.delete('/:id([0-9]+)', async (req, res) => {
    try {
        let success = await db.del(req.params.id);
        if (success) res.status(204).end(); // Delete ok, 204 No Content
        else res.status(404).send('Id not found'); // Nothing deleted
    } catch (err) {
        res.status(500).send(err);
    }
});

// Partial user data update with PATCH
user.patch('/:id([0-9]+)', async (req, res) => {
    let body = {
        ...req.body,
        password: req.body.password ? hash(req.body.password) : '',
        birth_year: Number(req.body.birth_year),
    };
    // Return 400 Bad Request if patched obj doesn't validate
    if (validate(body, userSchema).errors.length > 0) {
        res.status(400).send('Invalid user data');
    } else {
        // Try to update db row that has id
        let success = await db.updateUser(req.params.id, body);
        if (success) res.status(204).end(); // Update ok, 204 No Content
        else res.status(404).send('Id not found');
    }
});

module.exports = user;
