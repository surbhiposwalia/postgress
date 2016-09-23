var knex = require('./knex');

function insertQuery (objectInput, tableInput) {
   return knex.insert(objectInput)
    .into(tableInput);
}

module.exports = insertQuery;

// knex.insert({
//     name: 'New Food',
//     description: 'This is new thingy'
// }).into('recipies').then(function(){
//     console.log('Insert Complete');
//     return knex.destroy();
// });