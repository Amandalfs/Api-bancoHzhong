import { ExtractsByDataUseCase } from "../../../../domain/module/transactions/useCase/ExtractsByData/ExtractsByDataUseCase";
import { ExtractsRepository } from "../../../../entities/repositories/knexRepositories/ExtractsRepository";
import { ExtractsByDateTransactionsController } from "../../../../presentations/controllers/transactions/ExtractsByDateTransactions/ExtractsByDateTransactionsController";

export function makeExtractByDateTransactionsController(){
    const extractsRepository = new ExtractsRepository(); 
    const extractsByDateTransactionsUseCase = new ExtractsByDataUseCase(extractsRepository);
    const controller = new ExtractsByDateTransactionsController(extractsByDateTransactionsUseCase);
    return controller;
}