import { SendingMoneyUseCase } from "../../../../domain/module/transactions/useCase/SendingMoney/SendingMoneyUseCase";
import { ExtractsRepository } from "../../../../entities/repositories/knexRepositories/ExtractsRepository";
import { UserRepository } from "../../../../entities/repositories/knexRepositories/UserRepository";
import { SendingMoneyTransactionsController } from "../../../../presentations/controllers/transactions/SendingMoneyTransactions/SendingMoneyTransactionsController";

export function makeSendingMoneyTransactionsController(){
	const userRepository = new UserRepository();
	const extractsRepository = new ExtractsRepository();
	const sendingMoneyUseCase = new SendingMoneyUseCase(userRepository, extractsRepository);
	const controller = new SendingMoneyTransactionsController(sendingMoneyUseCase);
	return controller;
}