
import { MetricsUserUseCase } from "../../../../domain/module/acconts/useCase/MetricsUser/MetricsUserUseCase";
import { ExtractsRepository } from "../../../../entities/repositories/knexRepositories/ExtractsRepository";
import { UserRepository } from "../../../../entities/repositories/knexRepositories/UserRepository";
import { MetricsUserController } from "./../../../../presentations/controllers/users/MetricsUser/MetricsUserController";

export function makeMetricsUserController(): MetricsUserController {
	const usersRepository = new UserRepository();
	const extractsRepository = new ExtractsRepository();
	const useCase = new MetricsUserUseCase(usersRepository, extractsRepository);
	const controller = new MetricsUserController(useCase);
	return controller;
}