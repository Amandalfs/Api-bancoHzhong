const db = require("../sql/knex");

class UserRepository {
    async createUser(data){
        await db('users').insert(data);        
    }

    async findUserByUsername(username){
        return await db('users').where("username",username).first();
    }

    async findUserById(id){
        return await db('users').where("id",id).first();
    }

    async findUserByKeyPix(keypix){
        return await db('users').where('keypix', keypix).first();
    }

    async updateBalanceById(id, saldo){
        return await db('users').where("id", id).update("saldo", saldo);
    }

    async createKeyPixById(id, key){
        await db('users').where("id", id).update("keypix", key);
    }

    async deleteKeyPixById(id){
        await db('users').where("id", id).update("keypix", null);
    }

    async getKeyPixById(id){
        await db('users').where("id", id).select("keypix").first();
    }
   
}

module.exports = UserRepository;