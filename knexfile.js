const { config } = require('dotenv');

const path = require('path')

config();
const knex = require('knex');

module.exports = {
    development: {
      client: 'sqlite3',
      connection: {
        filename: path.resolve(__dirname, "sql", "database.sqlite3")
      },
      useNullAsDefault: true,
      migrations: {
        tableName: 'migrations',
        directory: './sql/migrations'
      }
    },
    production: {
      client: 'pg',
      connection: {
        host:process.env.PQ_HOST,
        port:5432,
        user:process.env.PQ_NAMEHOST,
        password:process.env.PQ_PASSWORD,
        database:process.env.PQ_DATABASE,
        ssl:false,
      },
      useNullAsDefault: true,
      migrations: {
        tableName: 'migrations',
        directory: './sql/migrations'
      },
      searchPath: ['knex', 'public']
    }
  }
  