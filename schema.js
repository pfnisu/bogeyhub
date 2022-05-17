// Define valid specs for objects to check before inserting to db

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

const group = {
    type: 'object',
    properties: {
        group_number: { type: 'integer', minimum: 1 },
        start_time: { type: 'string', format: 'time' },
        start_hole: { type: 'integer', minimum: 1 },
        start_position: { type: 'integer', minimum: 1 },
        user_id: { type: 'integer', minimum: 1 },
        round_id: { type: 'integer', minimum: 1 },
    },
    required: ['group_number', 'start_position', 'user_id', 'round_id'],
    maxProperties: 6,
};

const score = {
    type: 'object',
    properties: {
        result: { type: 'integer', minimum: 1 },
        hole_id: { type: 'integer', minimum: 1 },
        user_id: { type: 'integer', minimum: 1 },
        round_id: { type: 'integer', minimum: 1 },
    },
    required: ['result', 'hole_id', 'user_id', 'round_id'],
    maxProperties: 4,
};

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

module.exports = { competition, round, group, score, user, registration };
