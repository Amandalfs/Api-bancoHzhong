import"dotenv/config"

import path from "path";
import knex, { Knex } from 'knex';

let schema = 'public';
if(process.env.DATABASE_URL){
  const variableUrlSchema = new URL(process.env.DATABASE_URL).searchParams;
  schema = variableUrlSchema.get("schema");
}


export default<Knex.Config> {
    test: {
      client: 'pg',
      connection: process.env.DATABASE_URL,
      useNullAsDefault: true,
      migrations: {
        tableName: 'migrations',
        directory: './src/sql/migrations',
        schemaName: schema
      },
      searchPath: [schema]
    },
    development: {
      client: 'sqlite3',
      connection: {
        filename: path.resolve(__dirname, "src", "sql", "database.sqlite3")
      },
      useNullAsDefault: true,
      migrations: {
        tableName: 'migrations',
        directory: './src/sql/migrations',
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
        directory: './src/sql/migrations',
      },
      searchPath: ['knex', 'public']
    },
   
  }
  