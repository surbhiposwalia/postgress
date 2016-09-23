var knex = require('./knex');

knex.select('name','description')
.groupBy('name','description')
.from('recipies')

.then(function(recipies) {
    console.log(recipies);
   return knex.destroy();
});