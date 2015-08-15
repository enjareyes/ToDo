module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'enja'
    }
  },
  production: {
    client: 'postgresql',
    connection: {
      database: process.env.DATABASE_URL
    },
    pool: {
      min: 2,
      max: 10
    },
    migration: {
      tableName: 'knex_migrations'
    }
  }
}