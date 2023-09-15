import { GraficDayStatsUseCase } from "../../../../domain/module/transactions/useCase/GraficDayStats/GraficDayStatsUseCase";
import { ExtractsRepository } from "../../../../entities/repositories/knexRepositories/ExtractsRepository";
import { GraficExtractsDayByColumnController } from "../../../../presentations/controllers/transactions/GraficExtractsByDayColumn/GraficExtractsDayByColumnController";

export function makeGraficExtractsDayByColumnController(){
	const extractsRepository = new ExtractsRepository();
	const useCase = new GraficDayStatsUseCase(extractsRepository);
	const controller = new GraficExtractsDayByColumnController(useCase);
	return controller;
}