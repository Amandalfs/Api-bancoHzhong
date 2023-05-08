const AppError = require("../../utils/AppError");
const generatorDate = require("../../utils/dateGenerator");

module.exports = class DepositTransitionService {
    userRepository;
    extractsRepository;
    constructor(UserRepository, ExtractsRepository){
        this.userRepository = UserRepository;
        this.extractsRepository = ExtractsRepository;
    }
    
    async execute({deposit, id}){

        const tipo = "deposito";
        const data = generatorDate();

        const user = await this.userRepository.findUserById(id);

        if(deposit<0){
            throw new AppError("Saldo invalido");
        }
    
        const saldoNovo = user.saldo + deposit;

        const name = user.name;
        const desc = `Voce depositou R$${deposit.toFixed(2).replace('.',',')}`

        const extratoNew = {
            id_user: id,
            name: name,
            tipo: tipo,
            saldo: deposit,
            data: data,
            descricao: desc,
        }

        await this.extractsRepository.createExtracts(extratoNew);
        await this.userRepository.updateBalanceById(id, saldoNovo);

    }
}