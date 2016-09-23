var knex = require('./knex');

knex('recipies')
    .where({
        name: 'New Food'
    })
    .del()
    .then(function() {
        console.log('Delete Complete');
        return knex.destroy();
    });