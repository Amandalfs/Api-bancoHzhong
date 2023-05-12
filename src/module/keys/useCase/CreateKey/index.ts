import { UserRepository} from '../../../../repositories/UserRepository';
import {CreateKeyUseCase} from './CreateKeyUseCase';
import {CreateKeyController} from './CreateKeyController';

const userRepository = new UserRepository;
const createKeyUseCase = new CreateKeyUseCase(userRepository);
const createKeyController = new CreateKeyController(createKeyUseCase);

export default createKeyController;