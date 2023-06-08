import { IExtracsRepository } from "../../../../repositories/implementations/IExtractsRepository";
import { IUserRepository } from "../../../../repositories/implementations/IUserRepository";

import {date} from "../../../../utils/date";
import { InvalidValueError } from "../../errors/InvalidValueError";

class DepositTransactionsUseCase {
    constructor(private UserRepository: IUserRepository, private ExtractsRepository: IExtracsRepository){}
    
    async execute({deposit, id}){
        
        const tipo = "deposito";
        const data = date();

        const user = await this.UserRepository.findUserById(id);

        if(deposit<=0 || deposit===null){
            throw new InvalidValueError();
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

        await this.ExtractsRepository.createExtracts(extratoNew);
        await this.UserRepository.updateBalanceById(id, saldoNovo);

        return {
            extratoNew,
        }
    }
}

export { DepositTransactionsUseCase}