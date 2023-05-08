// repository
const ExtractsRepository = require('../repositories/ExtractsRepository');
const UserRepository = require('../repositories/UserRepository');

//services
const CreateUserService = require('../services/CreateUserService/CreateUserService');
const SessionsUserService = require('../services/SessionsUserService/SessionsUserService');
const ShowUserService = require('../services/ShowUserService/ShowUserService');

class usersController{
    async login(req, res){
        const { username } = req.body;
        const { password } = req.headers;
        
        const userRepository = new UserRepository;
        const sessionsUserService = new SessionsUserService(userRepository);
        const token = await sessionsUserService.execute(username, password);

        res.status(202).send({token});
        
    }
    async create(req, res){
        const {username, name, nasc, typeaccont, email} = req.body;
        const { password, cpf } = req.headers;

        const userRepository = new UserRepository
        const createUserService = new CreateUserService(userRepository);
        await createUserService.execute({username, name, nasc, typeaccont, email,  password, cpf});

        return res.status(201).send('Conta no hzhong criada com sucesso');
    }

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