require('dotenv').config()
const { Pool } = require('pg')

// Create connection pool to db
module.exports = new Pool({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPW,
    database: process.env.DBNAME,
    max: 30,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    ssl: process.env.DBSSL === 'true' ? true : false,
})
