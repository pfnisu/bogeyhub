const competition = require('./competition.js');
const admin = require('./admin.js');
const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

// Main function
(async () => {
    try {
        app.use(express.json());
        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            next();
        });
        app.use(express.static('frontend/build'));
        app.use('/competition', competition);
        // TODO authenticate /admin requests
        app.use('/admin', admin);

        const server = app.listen(port, () => {
            console.log('Listening on port ' + port);
        });
        process.on('SIGINT', async () => {
            server.close(() => {
                console.log('Server closed.');
                process.exit(1);
            });
        });
    } catch (err) {
        console.log(err);
    }
})();
