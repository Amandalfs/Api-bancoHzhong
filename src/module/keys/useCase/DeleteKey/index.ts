import {UserRepository} from '../../../../repositories/UserRepository';
import {DeleteKeyUseCase} from './DeleteKeyUseCase';
import {DeleteKeyController} from './DeleteKeyController';

const userRepository = new UserRepository;
const deleteKeyUseCase = new DeleteKeyUseCase(userRepository);
const deleteKeyController = new DeleteKeyController(deleteKeyUseCase);

export default deleteKeyController;