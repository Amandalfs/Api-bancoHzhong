import { ShowUserController } from "../../../../presentations/controllers/users/ShowUser/ShowUserController";
import { ShowUserUseCase } from "../../../../domain/module/acconts/useCase/ShowUser/ShowUserUseCase"
import { UserRepository } from "../../../../entities/repositories/knexRepositories/UserRepository";
import { ExtractsRepository } from "../../../../entities/repositories/knexRepositories/ExtractsRepository";

export function makeShowUserController(){
    const userRepository = new UserRepository;
    const extractsRepository = new ExtractsRepository;
    const showUserUseCase = new ShowUserUseCase(userRepository, extractsRepository);
    const controller = new ShowUserController(showUserUseCase);
    return controller;
}