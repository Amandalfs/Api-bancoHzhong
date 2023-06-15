import  {UserRepository} from "../../../../repositories/knexRepositories/UserRepository";
import  {SessionsUsersUseCase} from "./SessionsUsersUseCase"; 
import {SessionsUsersController} from "./SessionsUsersController"; 
import { AuthConfig } from "../../../../config/auth";
import { CodificadorAdapterCrypto } from "../../../../utils/Codificador/CodificadorAdapterCrypto";

const userRepository = new UserRepository;
const codificador = new CodificadorAdapterCrypto
const authConfig = AuthConfig;
const sessionsUsersUseCase = new SessionsUsersUseCase(userRepository, codificador, authConfig);
const sessionsUsersController = new SessionsUsersController(sessionsUsersUseCase);

export default sessionsUsersController;