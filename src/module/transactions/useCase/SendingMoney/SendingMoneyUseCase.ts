import { IExtracsRepository } from "../../../../repositories/implementations/IExtractsRepository";
import { IUserRepository } from "../../../../repositories/implementations/IUserRepository";
import { AppError } from "../../../../utils/AppError";
import { date } from "../../../../utils/date";
import { InvalidValueError } from "../../errors/InvalidValueError";
import { LimitDayError } from "../../errors/LimitDayError";
import { LimitError } from "../../errors/LimitError";

class SendingMoneyUseCase{
    constructor(private UserRepository: IUserRepository, private ExtractsRepository:IExtracsRepository){}

    async execute(id:number, keyPix:string, value:number){
            const user = await this.UserRepository.findUserById(id);
            const receiveUser = await this.UserRepository.findUserByKeyPix(keyPix);
            
            if(user.saldo<value){
                throw new AppError("Saldo Invalido para fazer o saque");
            }
            
            if(value<=0){
                throw new InvalidValueError();
            }

            if(user.keypix === keyPix){
                throw new AppError("Voce nao pode enviar dinheiro para voce");
            }

            if(!receiveUser){
                throw new AppError("A Chave pix e invalida");
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
            const dateNew = date();

            const totalDiario = await this.ExtractsRepository.CountBySending(dateNew, dateNew, user.id);
            for (const limitDay of limitsDay) {
                if(user.typeaccont === limitDay.type && totalDiario+value > limitDay.value){
                    throw new LimitDayError(limitDay.value, limitDay.type);
                }
            }

            const saldoReceive =  user.saldo - value;
            const saldoSend = receiveUser.saldo + value;
    
            const extratos = {
                send:{
                    id_user: id,
                    name: user.name,
                    tipo: "envio",
                    saldo: value,
                    data: date(),
                    descricao: `Voce transferiu R$${value.toFixed(2).replace('.',',')} para ${user.name}`,
                },
                receive: {
                    id_user: receiveUser.id,
                    name: receiveUser.name,
                    tipo: "recebido",
                    saldo: value,
                    data: date(),
                    descricao: `Voce recebeu R${value.toFixed(2).replace('.',',')} de ${receiveUser.name}`,
                }
                
            }
    
            await this.ExtractsRepository.createExtracts(extratos.send);
            await this.ExtractsRepository.createExtracts(extratos.receive);
    
            await this.UserRepository.updateBalanceById(user.id, saldoSend);
            await this.UserRepository.updateBalanceById(receiveUser.id, saldoReceive);
            return extratos;
       
    }
}

export { SendingMoneyUseCase };
