import { DeleteKeyUseCase } from "../../../../domain/module/keys/useCase/DeleteKey/DeleteKeyUseCase";
import { UserRepository } from "../../../../entities/repositories/knexRepositories/UserRepository";
import { DeleteKeyController } from "../../../../presentations/controllers/keys/DeleteKey/DeleteKeyController";

export function makeDeleteKeyController(){
	const userRepository = new UserRepository;
	const deleteKeyUseCase = new DeleteKeyUseCase(userRepository);
	const controller = new DeleteKeyController(deleteKeyUseCase);
	return controller;
}