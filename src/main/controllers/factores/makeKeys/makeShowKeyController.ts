import { ShowKeyUseCase } from "../../../../domain/module/keys/useCase/ShowKey/ShowKeyUseCase";
import { UserRepository } from "../../../../entities/repositories/knexRepositories/UserRepository";
import { ShowKeyController } from "../../../../presentations/controllers/keys/ShowKey/ShowKeyController";

export function makeShowKeyController(){
    const userRepository = new UserRepository();
    const showKeyUseCase = new ShowKeyUseCase(userRepository);
    const controller = new ShowKeyController(showKeyUseCase);
    return controller;
};