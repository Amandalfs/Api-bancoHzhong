import {UserRepository} from '../../../../repositories/UserRepository';
import {ExtractsRepository} from '../../../../repositories/ExtractsRepository';
import {ShowUserController} from './ShowUserController';
import {ShowUserUseCase} from './ShowUserUseCase';

const userRepository = new UserRepository;
const extractsRepository = new ExtractsRepository;
const showUserUseCase = new ShowUserUseCase(userRepository, extractsRepository);
const showUserController = new ShowUserController(showUserUseCase);

export default showUserController;