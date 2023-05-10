const ExtractsRepository = require('../../../../repositories/ExtractsRepository');
const UserRepository = require('../../../../repositories/UserRepository');

const DepositTransactionsUseCase = require('./DepositTransactionsUseCase');
const DepositTransactionsController = require('./DepositTransactionsController');

const extractsRepository = new ExtractsRepository;
const userRepository = new UserRepository;

const depositTransactionsUseCase = new DepositTransactionsUseCase(userRepository, extractsRepository);
const depositTransactionsController = new DepositTransactionsController(depositTransactionsUseCase);

module.exports = depositTransactionsController;