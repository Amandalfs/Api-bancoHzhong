import  {UserRepository} from "../../../../../entities/repositories/knexRepositories/UserRepository";
import  {SessionsUsersUseCase} from "./SessionsUsersUseCase"; 
import {SessionsUsersController} from "./SessionsUsersController"; 
import { AuthConfig } from "../../../../../config/auth";
import { CodificadorAdapterCrypto } from "../../../../../utils/Codificador/CodificadorAdapterCrypto";
import { GerenciadorDeTokenAdaptarJsonWebToken } from "../../../../../utils/GerenciadorDeToken/GerenciadorDeTokenAdaptarJsonWebToken";

const userRepository = new UserRepository;
const codificador = new CodificadorAdapterCrypto
const authConfig = AuthConfig;
const gerenciadorDeToken = new GerenciadorDeTokenAdaptarJsonWebToken;
const sessionsUsersUseCase = new SessionsUsersUseCase(userRepository, codificador, authConfig, gerenciadorDeToken);
const sessionsUsersController = new SessionsUsersController(sessionsUsersUseCase);

export default sessionsUsersController;