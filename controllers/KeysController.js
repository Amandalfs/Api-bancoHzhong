class keysController{
    async createKey(req, res){
        const { id } = req.user
        const ChaveGerada =  await keyGenerator();
        console.log(ChaveGerada);
        await dbUsers.updateUser({id: id}, {
            keypix: ChaveGerada
        })

        const user = await dbUsers.getUserById({id: id});
        const { keypix } = user;
        return res.status(201).send({"key":keypix});
            
    }

    async deleteKey(req, res){
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