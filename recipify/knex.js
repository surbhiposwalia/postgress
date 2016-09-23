var knex = require('knex')({
    client: 'pg',
    connection: {
        user: 'ubuntu',
        password: 'thinkful',
        database: 'recipify'
    },
});

// knex.insert({
//     name: 'New Food',
//     description: 'This is new'
// }).into('recipies').then(function(){
//     console.log('Insert Complete');
//     return knex.destroy();
// });

// knex.select('description').from('recipies').where({
//     name: 'Khichidi Kadhi'
// }).then(function(recipies) {
//     console.log(recipies[0]);
// });

// knex('recipies')
//     .update('description', "This has been changed")
//     .where({
//         name: 'New Food'
//     }).then(function() {
//         console.log('Update Complete');
//         return knex.destroy();
//     });

// knex('recipies')
//     .where({
//         name: 'New Food'
//     })
//     .del()
//     .then(function() {
//         console.log('Delete Complete');
//         return knex.destroy();
//     });

knex('recipies')
    .join('tag_recipie', 'tag_recipie.recipie_id', '=', 'recipies.id')
    .join('recipies_tag', 'recipies_tag.id', '=', 'tag_recipie.tag_id')
    .select('recipies.name', 'recipies_tag.tag')
    .then(function(result) {
        console.log(result);
        return knex.destroy();
    });