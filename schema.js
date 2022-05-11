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
    maxProperties: 7,
};

// Define valid spec for competition object
const round = {
    type: 'object',
    properties: {
        start_date: { type: 'string', format: 'date' },
        start_time: { type: 'string', format: 'time' },
        course_id: { type: 'integer', minimum: 1 },
        competition_id: { type: 'integer', minimum: 1 },
    },
    required: ['start_time', 'course_id', 'competition_id'],
    maxProperties: 4,
};

// Define valid spec for user object
const user = {
    type: 'object',
    properties: {
        id: { type: 'integer', minimum: 1 },
        name: { type: 'string' },
        password: { type: 'string' },
        birth_year: { type: ['integer', 'null'], minimum: 0, maximum: 2022 },
        sex: { type: ['string', 'null'], pattern: /male|female/ },
        role: { type: 'string', pattern: /admin|td|user/ },
    },
    maxProperties: 6,
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

module.exports = { competition, round, user, registration };
