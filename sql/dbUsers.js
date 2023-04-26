const { config } = require('dotenv');
const knex = require('knex')
config()

const environment =  process.env.Node_Config || "development"
const knexConfig = require('../knexfile')[environment]

const db = knex(knexConfig);

module.exports = {
    getAllUsers() {
        return db('users')
    },
    
    getUserById(id) {
        return db('users').where(id).first()
    },

    createUser(user) {
        return db('users').insert(user)
    },

    updateUser(id, user) {
        return db('users').where(id).update(user)
    },

    deleteUser(id) {
        return db('users').where(id).del()
    },

}

