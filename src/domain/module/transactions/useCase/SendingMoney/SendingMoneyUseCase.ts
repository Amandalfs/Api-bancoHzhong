import { IExtracsRepository, IUserRepository } from "./protocols"

import { CannotSendMoneyToYourAccountError, InvalidPixKeyError, BalanceInsuficientError, 
    InvalidValueError, LimitDayError, LimitError, ResourceNotFoundError } from "./errors"

export class DTORequestSendingMoneyUseCase {
    public id: number
    public keyPix: string
    public value: number
    constructor(id: number, keyPix:string , value: number){
        this.id = id;
        this.keyPix = keyPix;
        this.value = value;
    }
}

type Extracts = {
    send: Extract
    receive: Extract
} 

type Extract = {
    id_user: number
    name: string
    tipo: string
    saldo: number
    data: Date
    descricao: string
}

export class DTOResponseSendingMoneyUseCase {
    public extracts: Extracts;
    constructor(send: Extract, receive: Extract){
        this.extracts = {
            send,
            receive,
        }
    }
}

export interface ISendingMoneyUseCase {
    execute(data:DTORequestSendingMoneyUseCase): Promise<DTOResponseSendingMoneyUseCase>
}

class SendingMoneyUseCase implements ISendingMoneyUseCase{
    constructor(private UserRepository: IUserRepository, private ExtractsRepository:IExtracsRepository){}

    async execute({id, keyPix, value}:DTORequestSendingMoneyUseCase){
            const user = await this.UserRepository.findUserById(id);
            const receiveUser = await this.UserRepository.findUserByKeyPix(keyPix);

            if(!user){
                throw new ResourceNotFoundError();
            }
            
            if(user.saldo<value){
                throw new BalanceInsuficientError();
            }
            
            if(value<=0){
                throw new InvalidValueError();
            }

            if(user.keypix === keyPix){
                throw new CannotSendMoneyToYourAccountError();
            }

            if(!receiveUser){
                throw new InvalidPixKeyError();
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
                if(limit.type===user.typeaccont && value>limit.value) {
                    throw new LimitError(limit.value, limit.type);
                }                
            }
            
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
            const dateNew = new Date();

            const totalDiario = await this.ExtractsRepository.CountBySending({dateStart: dateNew, dateEnd: dateNew, UserId: user.id});
            for (const limitDay of limitsDay) {
                if(user.typeaccont === limitDay.type && totalDiario+value > limitDay.value){
                    throw new LimitDayError(limitDay.value, limitDay.type);
                }
            }

            const balanceReceive = receiveUser.saldo + value;
            const balanceSend = user.saldo - value;

            const send = {
                    id_user: id,
                    name: user.name,
                    tipo: "envio",
                    saldo: value,
                    data: new Date(),
                    descricao: `Voce transferiu R$${value.toFixed(2).replace('.',',')} para ${user.name}`,
            }

            const receive = {
                    id_user: receiveUser.id,
                    name: receiveUser.name,
                    tipo: "recebido",
                    saldo: value,
                    data: new Date(),
                    descricao: `Voce recebeu R${value.toFixed(2).replace('.',',')} de ${receiveUser.name}`,
            }
    
            await this.ExtractsRepository.createExtracts(send);
            await this.ExtractsRepository.createExtracts(receive);
    
            await this.UserRepository.updateBalanceById(user.id, balanceSend);
            await this.UserRepository.updateBalanceById(receiveUser.id, balanceReceive);
            
            return new DTOResponseSendingMoneyUseCase(send, receive); 
    }
}

export { SendingMoneyUseCase };
