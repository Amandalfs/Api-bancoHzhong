const UserRepository = require('../../../../repositories/UserRepository');
const SessionsUsersUseCase = require('./SessionsUsersUseCase');
const SessionsUsersController = require('./SessionsUsersController');

const userRepository = new UserRepository;
const sessionsUsersUseCase = new SessionsUsersUseCase(userRepository);
const sessionsUsersController = new SessionsUsersController(sessionsUsersUseCase);

module.exports =  sessionsUsersController;