exports.up = function(knex, Promise) { 
  console.log('migrating')
  return Promise.all([
    knex.schema.createTable('doThings', function(t){
      t.increments('id').primary();
      t.string('email');
      t.string('password');
    }),

    knex.schema.createTable('listItems', function(t){
      t.increments('id').primary();
      t.integer('userId').references('id').inTable('doThings');
      t.string('item');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('doThings'),
    knex.schema.dropTable('listItems')
  ])
};
