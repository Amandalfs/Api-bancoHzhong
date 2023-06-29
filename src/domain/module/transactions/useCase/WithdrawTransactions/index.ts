import {ExtractsRepository} from "../../../../../entities/repositories/knexRepositories/ExtractsRepository";
import {UserRepository} from "../../../../../entities/repositories/knexRepositories/UserRepository";
import {WithdrawTransactionsController} from "./WithdrawTransactionsController";
import {WithdrawTransactionsUseCase} from "./WithdrawTransactionsUseCase";

const userRepository = new UserRepository;
const extactsRepository = new ExtractsRepository;

const withdrawTransactionsUseCase = new WithdrawTransactionsUseCase(userRepository, extactsRepository);
const withdrawTransactionsController = new WithdrawTransactionsController(withdrawTransactionsUseCase);

export default withdrawTransactionsController;