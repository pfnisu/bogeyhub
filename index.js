const competition = require('./competition.js')
const admin = require('./admin.js')
const user = require('./user.js')
const express = require('express')

const app = express()
const port = process.env.PORT || 8080

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

        app.use('/backend/competition', competition)
        app.use('/backend/admin', admin) // TODO authenticate /admin requests
        app.use('/backend/user', user)

        const server = app.listen(port, () => {
            console.log('Listening on port ' + port)
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
