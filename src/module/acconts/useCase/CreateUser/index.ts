import {UserRepository} from '../../../../repositories/UserRepository';
const {CreateUserUseCase} = require('./CreateUserUseCase');
const {CreateUserController} = require('./CreateUserController');

const userRepository = new UserRepository;
const createUserUseCase = new CreateUserUseCase(userRepository);
const createUserController = new CreateUserController(createUserUseCase);

export default createUserController;
