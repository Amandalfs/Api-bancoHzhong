import {UserRepository} from '../../../../repositories/UserRepository';
import {ExtractsRepository} from '../../../../repositories/ExtractsRepository';

import {SendingMoneyUseCase} from './SendingMoneyUseCase';
import {SendingMoneyController} from './SendingMoneyController';

const userRepository = new UserRepository;
const extractsRepository = new ExtractsRepository;

const sendingMoneyUseCase = new SendingMoneyUseCase(userRepository, extractsRepository);
const sendingMoneyController = new SendingMoneyController(sendingMoneyUseCase);

export default sendingMoneyController;