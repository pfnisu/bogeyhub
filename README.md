# Fullstack project for course 4A00FQ05-3001

## App description

Disc golf scoring and competition organizing app.

App is at a feature preview stage for the scope of the course, but the aim is to develop it to a more full-featured, robust scoring platform.

## App URL

App is deployed to Heroku: <https://dg-scoring.herokuapp.com>

## Screenshots

List of current competitions:
![Competition list](/../screenshots/blob/screenshots/screenshots/complist.png?raw=true)

Results -table:
![Results](/../screenshots/blob/screenshots/screenshots/scoretable.png?raw=true)

User profile:
![Profile](/../screenshots/blob/screenshots/screenshots/profile.png?raw=true)

Registering to a competition:
![Register](/../screenshots/blob/screenshots/screenshots/register.png?raw=true)

Inputting scores:
![Input](/../screenshots/blob/screenshots/screenshots/scoreinput.png?raw=true)

Editing competition info:
![Admin view](/../screenshots/blob/screenshots/screenshots/admin.png?raw=true)

Creating rounds and groups:
![Round creation](/../screenshots/blob/screenshots/screenshots/createround.png?raw=true)

## Author

Niko Suoniemi <niko.suoniemi@tuni.fi>

## Technology

* Frontend
    * React 18
    * React Router 6
* Backend
    * Node.js
    * Express 4
    * Mysql
    * Jsonschema
    * Dotenv

## Local installation instructions

1. Clone the repository
    git clone https://github.com/pfnisu/tamk-backend-project-suoniemi-niko

2. Install dependencies
    cd tamk-backend-project-suoniemi-niko
    npm install --only=prod

3. Edit ENV variables. You might also have to change db name in sql scripts
    cp .env.sample .env
    $EDITOR .env

4. Run sql scripts on your db server. WARNING: this will DROP database
    mysql --user=user_name --password=password < util/db_create.sql
    mysql --user=user_name --password=password < util/db_insert.sql

5. Run app
    node index.js

6. Open in browser
    http://localhost:8080

## Releases

### 0.9.0

* Beta release
* Central features are functional, but there are still bugs
* Added
    * User account creation and updating, password hashing
    * Registration
    * Competition edit with round and group creation
    * Score input per group
    * Result view
* Todo
    * Order data in queries
    * Fetch more data at frontend startup
    * Some work to administration side
    * Stream-updating result view
    * Better state-handling in frontend
    * Better score input UI
    * Clean-up of backend code
    * Clean-up extraneous features from frontend
    * Secure account handling and proper authorization

### 0.1.1

* Added Heroku deployment

### 0.1.0

* Alpha-quality release
* Most of the central functionality incomplete
* Project framework and Frontend UI is in good order
* Admin functionality can be tested with
    * username: admin
    * no password

## Licence

Copyright (C) 2022 Niko Suoniemi <niko.suoniemi@tuni.fi>

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>
