const { config } = require('dotenv');
const knex = require('knex')
config()

const environment =  process.env.Node_Config || "development"
const knexConfig = require('../../knexfile')[environment]

const db = knex(knexConfig);

module.exports = db;
