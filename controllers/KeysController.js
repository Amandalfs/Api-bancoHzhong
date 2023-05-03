const dbUsers = require('../sql/dbUsers');
const keyGenerator = require('../utils/keyGenerator');

class keysController{
    async create(req, res){
        const { id } = req.user
        const ChaveGerada =  await keyGenerator();
        
        await dbUsers.updateUser({id: id}, {
            keypix: ChaveGerada
        })

        const user = await dbUsers.getUserById({id: id});
        const { keypix } = user;
        return res.status(201).send({"key":keypix});
            
    }

    async delete(req, res){
        const { id } = req.user

        await dbUsers.updateUser({ id: id }, { keypix: null });
        const result = await dbUsers.getUserById({id: id})
        return res.status(200).send({"msg": "Chave Deletada com sucesso"});
    }

    //getKey(){
    //    
    //}
}

module.exports = keysController;