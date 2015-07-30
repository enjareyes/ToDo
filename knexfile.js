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
    }
  }
}