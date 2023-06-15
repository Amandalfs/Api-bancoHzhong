import {UserRepository} from '../../../../repositories/UserRepository';
import {CreateUserUseCase} from './CreateUserUseCase';
import {CreateUserController} from './CreateUserController';
import { verifyAge } from '../../../../utils/verify/verifyAge';

const userRepository = new UserRepository;
const VerifyAge = new verifyAge;
const createUserUseCase = new CreateUserUseCase(userRepository, VerifyAge);
const createUserController = new CreateUserController(createUserUseCase);

export default createUserController;
