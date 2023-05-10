const UserRepository = require('../../../../repositories/UserRepository');
const ExtractsRepository = require('../../../../repositories/ExtractsRepository');

const SendingMoneyUseCase = require('./SendingMoneyUseCase');
const SendingMoneyController = require('./SendingMoneyController');

const userRepository = new UserRepository;
const extractsRepository = new ExtractsRepository;

const sendingMoneyUseCase = new SendingMoneyUseCase(userRepository, extractsRepository);
const sendingMoneyController = new SendingMoneyController(sendingMoneyUseCase);

module.exports = sendingMoneyController;