import { IExtracsRepository } from "../../../../repositories/implementations/IExtractsRepository";
import { IUserRepository } from "../../../../repositories/implementations/IUserRepository";
import { AppError } from "../../../../utils/AppError";
import { date } from "../../../../utils/date";

class SendingMoneyUseCase{
    constructor(private UserRepository: IUserRepository, private ExtractsRepository:IExtracsRepository){}

    async execute(id:number, keyPix:string, value:number){
            const user = await this.UserRepository.findUserById(id);
            const receiveUser = await this.UserRepository.findUserByKeyPix(keyPix);
            
            if(user.saldo<value){
                throw new AppError("Saldo Invalido para fazer o saque");
            }
            
            if(value<=0){
                throw new AppError("Saldo Invalido, voce so pode mandar valores positivos");
            }

            if(user.keypix === keyPix){
                throw new AppError("Voce nao pode enviar dinheiro para voce");
            }

            if(!receiveUser){
                throw new AppError("A Chave pix e invalida");
            }

            if(user.typeaccont === "poupanca" && value>300){
                throw new AppError("O limite da conta poupança é de R$300 por envio");
            }

            if(user.typeaccont === "corrente" && value>800){
                throw new AppError("O limite da conta corrente é de R$800 por envio");
            }

            if(user.typeaccont === "universitaria" && value>450){
                throw new AppError("O limite da conta universitaria é de R$450 por envio");
            }
    
            const saldoReceive =  user.saldo - value;
            const saldoSend = receiveUser.saldo + value;
    
            const extratos = {
                send:{
                    id_user: id,
                    name: user.name,
                    tipo: "transferencia(envio)",
                    saldo: value,
                    data: date(),
                    descricao: `Voce transferiu R$${value.toFixed(2).replace('.',',')} para ${user.name}`,
                },
                receive: {
                    id_user: receiveUser.id,
                    name: receiveUser.name,
                    tipo: "transferencia(recebido)",
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
