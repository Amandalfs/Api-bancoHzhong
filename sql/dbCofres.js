const { config } = require('dotenv');
const knex = require('knex')
config()

const environment =  process.env.Node_Config || "development"
const knexConfig = require('../knexfile')[environment]

const db = knex(knexConfig);

module.exports = {
    getAllUsers(id_users) {
        return db('cofres').where(id_users)
    },
    
    getUserById(id_users, id) {
        return db('users').where(id_users).and(id).first()
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