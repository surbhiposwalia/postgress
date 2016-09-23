var knex = require('./knex');

knex('recipies')
    .update('description', "This has been changed")
    .where({
        name: 'New Food'
    }).then(function() {
        console.log('Update Complete');
        return knex.destroy();
    });
