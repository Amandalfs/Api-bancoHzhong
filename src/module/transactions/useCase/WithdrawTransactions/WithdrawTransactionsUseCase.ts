import { IExtracsRepository, IUserRepository} from "./protocols"

import {BalanceInsuficientError,InvalidValueError,LimitDayError,LimitError,ResourceNotFoundError} from "./errors"

export interface DTORequestWithdrawTransctionsUseCase {
    valueWithdraw: number
    id: number
}

export interface DTOResponseWithdrawTransctionsUseCase {
    extratoNew: {
        id_user: number,
        name: string,
        tipo: string,
        saldo: number,
        data: string,
        descricao: string,
    }
}

export interface IWithdrawTransctionsUseCase {
    execute(data: DTORequestWithdrawTransctionsUseCase): Promise<DTOResponseWithdrawTransctionsUseCase>    
}

class WithdrawTransactionsUseCase implements IWithdrawTransctionsUseCase{
    constructor(private UserRepository:IUserRepository, private ExtractsRepository:IExtracsRepository){}

    async execute({valueWithdraw, id}){

            const user = await this.UserRepository.findUserById(id);
            
            if(!user){
                throw new ResourceNotFoundError();
            }

            if(valueWithdraw<=0){
                throw new InvalidValueError();
            }

            if(valueWithdraw>user.saldo){
                throw new BalanceInsuficientError();
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
            
            const data = `${new Date()}`;
            const tipo = "Saque";

            const totalDiario = await this.ExtractsRepository.CountByWithdraw({dateStart: data, dateEnd: data, UserId:user.id})

            const limitsDay = [
                {
                    type: "poupanca",
                    value: 1500
                },
                {
                    type: "corrente",
                    value: 4000
                },
                {
                    type: "universitaria",
                    value: 2250
                }
            ]

            for (const limitDay of limitsDay) {
                if(user.typeaccont === limitDay.type && totalDiario+valueWithdraw > limitDay.value){
                    throw new LimitDayError(limitDay.value, limitDay.type);
                }
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