const { config } = require('dotenv');
const knex = require('knex')
config()

const environment =  process.env.Node_Config || "development"
const knexConfig = require('../knexfile')[environment]

const db = knex(knexConfig);

module.exports = {
    getAllUsers() {
        return db('extratos')
    },
    
    getUserById(id) {
        return db('extratos').where(id).first()
    },

    createUser(user) {
        return db('extratos').insert(user)
    },

    updateUser(id, user) {
        return db('extratos').where(id).update(user)
    },

    deleteUser(id) {
        return db('extratos').where(id).del()
    },

}

