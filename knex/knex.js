var knex = require('knex')({
    client: 'pg',
    connection: {
        user: 'ubuntu',
        password: 'thinkful',
        database: 'recipify'
    },
});

module.exports = knex;