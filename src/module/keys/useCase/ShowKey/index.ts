import {UserRepository} from '../../../../repositories/knexRepositories/UserRepository';
import {ShowKeyUseCase} from './ShowKeyUseCase';
import {ShowKeyController} from './ShowKeyController';

const userRepository = new UserRepository;
const showKeyUseCase = new ShowKeyUseCase(userRepository);
const showKeyController = new ShowKeyController(showKeyUseCase);

export default showKeyController;