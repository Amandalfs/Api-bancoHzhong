const { config } = require('dotenv');
config();
const knex = require('knex');

module.exports = {
    development: {
      client: 'sqlite3',
      connection: {
        filename: './sql/database.sqlite3'
      },
      useNullAsDefault: true,
      migrations: {
        tableName: 'migrations',
        directory: './sql/migrations'
      }
    },
    production: {
      client: 'pg',
      connection: process.env.PG_CONNECTION_STRING,
      useNullAsDefault: true,
      migrations: {
        tableName: 'migrations',
        directory: './sql/migrations'
      },
      searchPath: ['knex', 'public']
    }
  }
  