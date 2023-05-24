import { IExtracsRepository } from "../../../../repositories/implementations/IExtractsRepository";
import { IUserRepository } from "../../../../repositories/implementations/IUserRepository";
import { AppError } from "../../../../utils/AppError";
import { date } from "../../../../utils/date";


class WithdrawTransactionsUseCase {
    constructor(private UserRepository:IUserRepository, private ExtractsRepository:IExtracsRepository){}

    async execute(valueWithdraw:number, id:number){

        try {
            
            const user = await this.UserRepository.findUserById(id);
            
            if(!user){
                throw new AppError("Recurso nao encontrado");
            }

            if(valueWithdraw<=0){
                throw new AppError("Saldo invalido");
            }
        
            if(valueWithdraw>user.saldo){
                throw new AppError("Saldo insuficiente para fazer saque");
            }

            if(user.typeaccont === "poupanca" && valueWithdraw>300) {
                throw new AppError("O seu limite por saque é de R$300");
            }

            if(user.typeaccont === "corrente" && valueWithdraw>800) {
                throw new AppError("O seu limite por saque é de R$800");
            }

            if(user.typeaccont === "universitaria" && valueWithdraw>450) {
                throw new AppError("O seu limite por saque é de R$450");
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

            await this.ExtractsRepository.createExtracts(extratoNew);
            await this.UserRepository.updateBalanceById(id, saldoNovo);

            return {
                extratoNew,
            }
        } catch (error) {
            throw new AppError(error.message);
        }
        
    }
}

export {WithdrawTransactionsUseCase}