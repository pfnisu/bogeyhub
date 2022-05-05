// Define valid spec for competition object
const competition = {
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

// Define valid spec for user object
const user = {
    type: 'object',
    properties: {
        name: { type: 'string' },
        password: { type: 'string' },
        role_id: { type: 'integer', minimum: 1 },
        id: { type: 'integer', minimum: 1 },
        sex: { type: 'string', pattern: /male|female/ },
        age: { type: 'integer', minimum: 0, maximum: 150 },
    },
    maxProperties: 4,
};

// Define valid spec for registration object
const registration = {
    type: 'object',
    properties: {
        user_id: { type: 'integer', minimum: 1 },
        competition_id: { type: 'integer', minimum: 1 },
        division: { type: 'string', pattern: /MPO|FPO/ },
    },
    required: ['user_id', 'competition_id', 'division'],
    maxProperties: 3,
};
module.exports = { competition, user, registration };
