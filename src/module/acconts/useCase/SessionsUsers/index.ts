import  {UserRepository} from "../../../../repositories/knexRepositories/UserRepository";
import  {SessionsUsersUseCase} from "./SessionsUsersUseCase"; 
import {SessionsUsersController} from "./SessionsUsersController"; 

const userRepository = new UserRepository;
const sessionsUsersUseCase = new SessionsUsersUseCase(userRepository);
const sessionsUsersController = new SessionsUsersController(sessionsUsersUseCase);

export default sessionsUsersController;