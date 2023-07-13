import { ExtractsRepository } from "../../../../entities/repositories/knexRepositories/ExtractsRepository";
import { UserRepository } from "../../../../entities/repositories/knexRepositories/UserRepository";
import { DepositTransactionsController } from "../../../../presentations/controllers/transactions/DepositTransactions/DepositTransactionsController";
import { DepositTransactionsUseCase } from "../../../../presentations/controllers/transactions/DepositTransactions/DepositTransactionsControllerProtocols";


export function makeDepositTransactionsController(){
    const userRepository = new UserRepository();
    const extractsRepository = new ExtractsRepository();
    const depositTransactionsUseCase = new DepositTransactionsUseCase(userRepository, extractsRepository);
    const controller = new DepositTransactionsController(depositTransactionsUseCase);
    return controller
}