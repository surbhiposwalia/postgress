var knex = require('./knex');

var joinQuery = function () {
    return knex.from('recipies')
    .join('tag_recipie', 'tag_recipie.recipie_id', '=', 'recipies.id')
    .join('recipies_tag', 'recipies_tag.id', '=', 'tag_recipie.tag_id')
    .join('steps','steps.recipie_id' ,'=', 'tag_recipie.recipie_id')
    .select('recipies.name', 'recipies_tag.tag', 'steps.step')
}

module.exports = joinQuery;