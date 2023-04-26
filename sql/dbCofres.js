const { db } = require('./sqlconfig')

module.exports = {
    getAllUsers(id_users) {
        return db('cofres').where(id_users)
    },
    
    getUserById(id_users, id) {
        return db('cofres').where(id_users).and(id).first()
    },

    createUser(user) {
        return db('cofres').insert(user)
    },

    updateUser(id, user) {
        return db('cofres').where(id).update(user)
    },

    deleteUser(id) {
        return db('cofres').where(id).del()
    },

}