const AppError = require("../../../../utils/AppError");
const date = require("../../../../utils/date");

module.exports = class WithdrawTransactionsUseCase {
    userRepository;
    extractsRepository;
    constructor(UserRepository, ExtractsRepository){
        this.userRepository = UserRepository;
        this.extractsRepository = ExtractsRepository;
    }

    async execute({valueWithdraw, id}){

        try {
            
            const user = await this.userRepository.findUserById(id);

            if(valueWithdraw<=0){
                throw new AppError("Saldo invalido");
            }
        
            if(valueWithdraw>user.saldo){
                throw new AppError("Saldo insuficiente para fazer saque");
            }
            
            const tipo = "Saque";
            const data = date();


            const saldoNovo = user.saldo - valueWithdraw;

            const desc = `Voce sacou R$${valueWithdraw.toFixed(2).replace('.',',')}`

            const extratoNew = {
                id_user: id,
                name: user.name,
                tipo: tipo,
                saldo: saldoNovo,
                data: data,
                descricao: desc,
            }

            await this.extractsRepository.createExtracts(extratoNew);
            await this.userRepository.updateBalanceById(id, saldoNovo);

        } catch (error) {
            throw new AppError(error.message);
        }
        
    }
}