const UserRepository = require('../../../../repositories/UserRepository');
const ExtractRepository = require('../../../../repositories/ExtractsRepository');
const ShowUserController = require('./ShowUserController');
const ShowUserUseCase = require('./ShowUserUseCase');

const userRepository = new UserRepository;
const extractsRepository = new ExtractRepository;
const showUserUseCase = new ShowUserUseCase(userRepository, extractsRepository);
const showUserController = new ShowUserController(showUserUseCase);

module.exports = showUserController;