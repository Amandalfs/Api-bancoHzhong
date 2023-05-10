const UserRepository = require('../repositories/UserRepository');

const DeleteKeyPixById = require('../services/DeleteKeyService/DeleteKeyService');
const ShowKeyService = require('../services/ShowKeyService/ShowKeyService');

class keysController{
    async delete(req, res){
        const { id } = req.user

        const userRepository = new UserRepository;
        const deleteKeyPixById = new DeleteKeyPixById(userRepository);
        await deleteKeyPixById.execute(id);

        return res.status(200).send({"msg": "Chave Deletada com sucesso"});
    }

    async getKey(req, res){
       const { id } = req.user;
       
       const userRepository = new UserRepository;
       const showKeyService = new ShowKeyService(userRepository);
       const keypix = await showKeyService.execute(id);

       return res.status(200).json(keypix);
    }
}

module.exports = keysController;