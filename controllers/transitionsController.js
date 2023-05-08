const UserRepository = require('../repositories/UserRepository');
const ExtractsRepository = require('../repositories/ExtractsRepository');

const DepositTransitionService = require('../services/DepositTransitionService/DepositTransitionService');
const WithdrawTransitionService = require('../services/WithdrawTransitionService/WithdrawTransitionService');
const TransitionsUserByUser2Service = require('../services/TransitionsUserByUser2Service/TransitionsUserByUser2Service');
const ExtractsByDatesService = require('../services/ExtractsByDatesService/ExtractsByDatesService');

class TransitionsController{
    async deposit(req, res){
        const { deposit } = req.body;
        const { id } = req.user;

        const userRepository = new UserRepository;
        const extractsRepository = new ExtractsRepository;
        const depositTransitionService = new DepositTransitionService(userRepository, extractsRepository);
        await depositTransitionService.execute({id, deposit});

        return res.status(202).send("Deposito efetuado com sucesso");

    }

    async withdraw(req, res){
        const { valueWithdraw } = req.body;
        const { id } = req.user;

        const userRepository = new UserRepository;
        const extractsRepository = new ExtractsRepository;
        const withdrawTransitionService = new WithdrawTransitionService(userRepository, extractsRepository);
        await withdrawTransitionService.execute({valueWithdraw, id});

        return res.status(202).send({"Saque efetuado com sucesso":valueWithdraw});
    }

    async transaction(req, res){
        const { id } = req.user;
        const {deposit, keypix } = req.body;
      
        const userRepository = new UserRepository;
        const extractsRepository = new ExtractsRepository;
        const transitionsUserByUser2Service = new TransitionsUserByUser2Service(userRepository, extractsRepository);
        const extracts = await transitionsUserByUser2Service.execute(id, keypix, deposit);
    
       return res.status(201).send({extracts});
    }

    async extract(req, res){
        const { id } = req.user
        const {dateInicial, dateFinal} = req.body

        const extractsRepository = new ExtractsRepository;
        const extractsByDatesService = new ExtractsByDatesService(extractsRepository);
        const extracts = await extractsByDatesService.execute(id, dateInicial, dateFinal);

        return res.status(201).send(extracts);

    }

    
}

module.exports = TransitionsController;