
exports.up = function(knex, Promise) {
  
  return Promise.all([
    knex.schema.createTable('doThings', function(t){
      t.increments('id').primary();
      t.string('email');
      t.string('password');
      t.string('listItems');
    })
  ])

};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('doThings')
  ])
};
