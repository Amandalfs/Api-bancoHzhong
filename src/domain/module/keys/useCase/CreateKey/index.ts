import { UserRepository} from '../../../../../entities/repositories/knexRepositories/UserRepository';
import {CreateKeyUseCase} from './CreateKeyUseCase';
import {CreateKeyController} from './CreateKeyController';
import { KeyGeneratorAdapterCrypto } from './protocols';

const userRepository = new UserRepository;
const keyGenerator = new KeyGeneratorAdapterCrypto;
const createKeyUseCase = new CreateKeyUseCase(userRepository, keyGenerator);
const createKeyController = new CreateKeyController(createKeyUseCase);

export default createKeyController;