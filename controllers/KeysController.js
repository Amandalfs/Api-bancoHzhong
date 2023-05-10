const UserRepository = require('../repositories/UserRepository');

const ShowKeyService = require('../services/ShowKeyService/ShowKeyService');

class keysController{

    async getKey(req, res){
       const { id } = req.user;
       
       const userRepository = new UserRepository;
       const showKeyService = new ShowKeyService(userRepository);
       const keypix = await showKeyService.execute(id);

       return res.status(200).json(keypix);
    }
}

module.exports = keysController;