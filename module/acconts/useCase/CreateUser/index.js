const UserRepository = require('../../../../repositories/UserRepository');
const CreateUserUseCase = require('./CreateUserUseCase');
const CreateUserController = require('./CreateUserController');

const userRepository = new UserRepository;
const createUserUseCase = new CreateUserUseCase(userRepository);
const createUserController = new CreateUserController(createUserUseCase);

module.exports = createUserController
