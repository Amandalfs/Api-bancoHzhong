const UserRepository = require('../../../../repositories/UserRepository');
const DeleteKeyUseCase = require('./DeleteKeyUseCase');
const DeleteKeyController = require('./DeleteKeyController');

const userRepository = new UserRepository;
const deleteKeyUseCase = new DeleteKeyUseCase(userRepository);
const deleteKeyController = new DeleteKeyController(deleteKeyUseCase);

module.exports = deleteKeyController;