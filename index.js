const competition = require('./competition.js')
const admin = require('./admin.js')
const user = require('./user.js')
const express = require('express')

const app = express()
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 10000

// Main function
const main = async () => {
    try {
        app.use(express.json())
        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*')
            next()
        })

        app.use(express.static('frontend/build'))
        // Delegate frontend routing (handled by react-router)
        app.use(
            ['/admin/*', '/competition/*', '/login/'],
            express.static('frontend/build')
        )

        app.use('/api/competition', competition)
        app.use('/api/admin', admin) // TODO authenticate /admin requests
        app.use('/api/user', user)

        const server = app.listen(port, host, () => {
            console.log(`Listening ${host}:${port}`)
        })
        process.on('SIGINT', async () => {
            server.close(() => {
                console.log('Server closed.')
                process.exit(1)
            })
        })
    } catch (err) {
        console.log(err)
    }
}
main()
