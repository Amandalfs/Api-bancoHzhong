const UserRepository = require('../../../../repositories/UserRepository');
const ShowKeyUseCase = require('./ShowKeyUseCase');
const ShowKeyController = require('./ShowKeyController');

const userRepository = new UserRepository;
const showKeyUseCase = new ShowKeyUseCase(userRepository);
const showKeyController = new ShowKeyController(showKeyUseCase);

module.exports = showKeyController;