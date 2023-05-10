// repository
const ExtractsRepository = require('../repositories/ExtractsRepository');
const UserRepository = require('../repositories/UserRepository');

//services
const ShowUserService = require('../services/ShowUserService/ShowUserService');

class usersController{
    async show(req, res){
        const { id } = req.user;
        
        const userRepository = new UserRepository; 
        const extractsRepository = new ExtractsRepository;
        const showUserService = new ShowUserService(userRepository, extractsRepository);
        const dados = await showUserService.execute(id);

        return res.status(201).json({dados});
    }
}

module.exports = usersController;