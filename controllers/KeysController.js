const UserRepository = require('../repositories/UserRepository');

const DeleteKeyPixById = require('../services/DeleteKeyService/DeleteKeyService');
const CreateKeyService = require('../services/CreateKeyService/CreateKeyService');
const ShowKeyService = require('../services/ShowKeyService/ShowKeyService');


class keysController{
    async create(req, res){
        const { id } = req.user

        const userRepository = new UserRepository;
        const createKeyService = new CreateKeyService(userRepository);
        const keypix = await createKeyService.execute(id);

        return res.status(201).send({"key":keypix});
            
    }

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