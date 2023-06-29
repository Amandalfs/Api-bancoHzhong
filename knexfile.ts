const { config } = require('dotenv');

import path from "path";
config();

import knex from "knex"

export default {
    development: {
      client: 'sqlite3',
      connection: {
        filename: path.resolve(__dirname, "src", "sql", "database.sqlite3")
      },
      useNullAsDefault: true,
      migrations: {
        tableName: 'migrations',
        directory: './src/sql/migrations'
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
        directory: './src/sql/migrations'
      },
      searchPath: ['knex', 'public']
    },
    test: {
      client: 'pg',
      connection: process.env.BASE_URL,
      useNullAsDefault: true,
      migrations: {
        tableName: 'migrations',
        directory: './src/sql/migrations'
      }
    }
  }
  