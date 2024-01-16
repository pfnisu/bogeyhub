require('dotenv').config()
const { Pool } = require('pg')

// Create connection pool to db
module.exports = new Pool({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPW,
    database: process.env.DBNAME,
    max: process.env.DBCONN,
    idleTimeoutMillis: process.env.DBIDLE,
    connectionTimeoutMillis: process.env.DBWAIT,
    ssl: process.env.DBSSL === 'true' ? true : false,
})
