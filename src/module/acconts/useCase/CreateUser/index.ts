import {UserRepository} from '../../../../repositories/knexRepositories/UserRepository';
import {CreateUserUseCase} from './CreateUserUseCase';
import {CreateUserController} from './CreateUserController';
import { verifyAge } from '../../../../utils/verify/verifyAge';
import { ValidarCpf } from '../../../../utils/verify/validarCpf';

const userRepository = new UserRepository;
const VerifyAge = new verifyAge;
const validarCpf = new ValidarCpf;
const createUserUseCase = new CreateUserUseCase(userRepository, VerifyAge, validarCpf);
const createUserController = new CreateUserController(createUserUseCase);

export default createUserController;
