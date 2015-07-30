var config = require('../knexfile.js'),
    env = process.env.NODE_ENV || 'production',
    // env = process.env.NODE_ENV || 'development',
    knex = require('knex')(config[env]);

module.exports = knex;
knex.migrate.latest([config]);