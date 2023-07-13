import { IExtracsRepository, IUserRepository} from "./protocols"

import { InvalidValueError, ResourceNotFoundError } from "./errors";

export class DTORequestDepositTransactionsUseCase {
    public deposit: number
    public id: number
    constructor(deposit: number, id: number){
        this.deposit = deposit;
        this.id = id;
    }
}

interface ExtractNew{
    id_user: number
    name: string
    tipo: string
    saldo: number
    data: Date
    descricao: string
}
export class DTOResponseDepositTransactionsUseCase {
    public id_user: number
    public name: string
    public tipo: string
    public saldo: number
    public data: Date
    public descricao: string
    constructor({id_user, name, tipo, saldo, data, descricao}: ExtractNew){
        this.id_user = id_user;
        this.name = name;
        this.tipo = tipo;
        this.saldo = saldo;
        this.data = data; 
        this.descricao = descricao;
    }
}

export interface IDepositTransactionsUseCase {
    execute(data: DTORequestDepositTransactionsUseCase): Promise<DTOResponseDepositTransactionsUseCase>    
}

class DepositTransactionsUseCase implements IDepositTransactionsUseCase {
    constructor(private UserRepository: IUserRepository, private ExtractsRepository: IExtracsRepository){}
    
    async execute({deposit, id}: DTORequestDepositTransactionsUseCase){
        
        const tipo = "deposito";

        const user = await this.UserRepository.findUserById(id);

        if(!user){
            throw new ResourceNotFoundError()
        }

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
            data: new Date(),
            descricao: desc,
        }

        await this.ExtractsRepository.createExtracts(extratoNew);
        await this.UserRepository.updateBalanceById(id, saldoNovo);

        return new DTOResponseDepositTransactionsUseCase(extratoNew);
    }
}

export { DepositTransactionsUseCase}