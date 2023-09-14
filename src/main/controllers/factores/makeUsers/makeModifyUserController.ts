
import { ModifyUserUseCase } from "../../../../domain/module/acconts/useCase/ModifyUser/ModifyUserUseCase";
import { UserRepository } from "../../../../entities/repositories/knexRepositories/UserRepository";
import { CodificadorAdapterCrypto } from "../../../../utils/Codificador/CodificadorAdapterCrypto";
import { ModifyUserController } from "./../../../../presentations/controllers/users/ModifyUser/ModifyUserController";

export function makeModifyUserController(): ModifyUserController{
	const userRepository = new UserRepository();
	const encoder = new CodificadorAdapterCrypto();
	const useCase = new ModifyUserUseCase(userRepository, encoder);
	const controller = new ModifyUserController(useCase);
	return controller;
}