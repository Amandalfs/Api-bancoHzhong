const UserRepository = require('../../../../repositories/UserRepository');
const CreateKeyUseCase = require('./CreateKeyUseCase');
const CreateKeyController = require('./CreateKeyController');

const userRepository = new UserRepository;
const createKeyUseCase = new CreateKeyUseCase(userRepository);
const createKeyController = new CreateKeyController(createKeyUseCase);

module.exports = createKeyController;