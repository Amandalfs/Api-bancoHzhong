import { ExtractsRepository } from "../../../../entities/repositories/knexRepositories/ExtractsRepository";
import { UserRepository } from "../../../../entities/repositories/knexRepositories/UserRepository";
import { WithdrawTransactionsController } from "../../../../presentations/controllers/transactions/WithdrawTransactions/WithdrawTransactionsController";
import { WithdrawTransactionsUseCase } from "../../../../presentations/controllers/transactions/WithdrawTransactions/WithdrawTransactionsControllerProtocols";

export function makeWithdrawTransactionsController(){
	const userRepository = new UserRepository();
	const extractsRepository = new ExtractsRepository();
	const withdrawTransactionsUseCase = new WithdrawTransactionsUseCase(userRepository, extractsRepository);
	const controller = new WithdrawTransactionsController(withdrawTransactionsUseCase);
	return controller;
}