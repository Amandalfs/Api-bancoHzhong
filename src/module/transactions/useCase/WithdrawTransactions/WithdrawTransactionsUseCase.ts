import { IExtracsRepository } from "../../../../repositories/implementations/IExtractsRepository";
import { IUserRepository } from "../../../../repositories/implementations/IUserRepository";
import { AppError } from "../../../../utils/AppError";
import { date } from "../../../../utils/date";
import { LimitError } from "../../errors/LimitError";


class WithdrawTransactionsUseCase {
    constructor(private UserRepository:IUserRepository, private ExtractsRepository:IExtracsRepository){}

    async execute(valueWithdraw:number, id:number){

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

            const Limits = [
                {
                    type: "poupanca",
                    value: 300
                },
                {
                    type: "corrente",
                    value: 800
                },
                {
                    type: "universitaria",
                    value: 450
                }
            ]

            for (const limit of Limits) {
                if(limit.type===user.typeaccont && valueWithdraw>limit.value) {
                    throw new LimitError(limit.value, limit.type);
                }                
            }
            
            const data = date();
            const tipo = "Saque";

            const totalDiario = await this.ExtractsRepository.CountByWithdraw(data, data, user.id)

            if(user.typeaccont==="poupanca" && totalDiario+valueWithdraw > 1500){
                throw new AppError("Voce atingiu seu limite diario!")
            }

            if(user.typeaccont==="corrente" && totalDiario+valueWithdraw > 4000){
                throw new AppError("Voce atingiu seu limite diario!")
            }

            if(user.typeaccont==="universitaria" && totalDiario+valueWithdraw > 2250){
                throw new AppError("Voce atingiu seu limite diario!")
            }

            const saldoNovo = user.saldo - valueWithdraw;

            const desc = `Voce sacou R$${valueWithdraw.toFixed(2).replace('.',',')}`

            const extratoNew = {
                id_user: id,
                name: user.name,
                tipo: tipo,
                saldo: valueWithdraw,
                data: data,
                descricao: desc,
            }

            await this.ExtractsRepository.createExtracts(extratoNew);
            await this.UserRepository.updateBalanceById(id, saldoNovo);

            return {
                extratoNew,
            }

    }
}

export {WithdrawTransactionsUseCase}