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

module.exports = { competition };
