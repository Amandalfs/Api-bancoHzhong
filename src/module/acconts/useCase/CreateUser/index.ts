import {UserRepository} from '../../../../repositories/knexRepositories/UserRepository';
import {CreateUserUseCase} from './CreateUserUseCase';
import {CreateUserController} from './CreateUserController';
import { verifyAge } from '../../../../utils/verify/verifyAge';
import { ValidarCpf } from '../../../../utils/verify/validarCpf';
import { CodificadorAdapterCrypto } from '../../../../utils/Codificador/CodificadorAdapterCrypto';

const userRepository = new UserRepository;
const VerifyAge = new verifyAge;
const validarCpf = new ValidarCpf;
const codificador = new CodificadorAdapterCrypto;
const createUserUseCase = new CreateUserUseCase(userRepository, VerifyAge, validarCpf, codificador);
const createUserController = new CreateUserController(createUserUseCase);

export default createUserController;
