import {ExtractsRepository} from '../../../../repositories/knexRepositories/ExtractsRepository';
import {UserRepository} from '../../../../repositories/knexRepositories/UserRepository';

import {DepositTransactionsUseCase} from './DepositTransactionsUseCase';
import {DepositTransactionsController} from './DepositTransactionsController';

const extractsRepository = new ExtractsRepository;
const userRepository = new UserRepository;

const depositTransactionsUseCase = new DepositTransactionsUseCase(userRepository, extractsRepository);
const depositTransactionsController = new DepositTransactionsController(depositTransactionsUseCase);

export default depositTransactionsController;