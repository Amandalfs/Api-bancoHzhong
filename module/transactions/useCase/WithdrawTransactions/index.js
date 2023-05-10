const ExtractsRepository = require("../../../../repositories/ExtractsRepository");
const UserRepository = require("../../../../repositories/UserRepository");
const WithdrawTransactionsController = require("./WithdrawTransactionsController");
const WithdrawTransactionsUseCase = require("./WithdrawTransactionsUseCase");

const userRepository = new UserRepository;
const extactsRepository = new ExtractsRepository;

const withdrawTransactionsUseCase = new WithdrawTransactionsUseCase(userRepository, extactsRepository);
const withdrawTransactionsController = new WithdrawTransactionsController(withdrawTransactionsUseCase);

module.exports = withdrawTransactionsController;