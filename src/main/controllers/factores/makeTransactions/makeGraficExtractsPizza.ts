import { GraficExtractsPizzaUseCase } from "../../../../domain/module/transactions/useCase/GraficExtractsPizza/GraficExtractsPizzaUseCase";
import { ExtractsRepository } from "../../../../entities/repositories/knexRepositories/ExtractsRepository";
import { GraficExtractsPizzaController } from "../../../../presentations/controllers/transactions/GrafictExtractsPizza/GraficExtractsPizzaController";

export function makeGraficExtractsPizza(){
	const extractsRepository = new ExtractsRepository();
	const useCase = new GraficExtractsPizzaUseCase(extractsRepository);
	const controller = new GraficExtractsPizzaController(useCase);
	return controller;
}