import { IExtracsRepository } from "../../../../repositories/implementations/IExtractsRepository";
import { IUserRepository } from "../../../../repositories/implementations/IUserRepository";
import { AppError } from "../../../../utils/AppError";
import { date } from "../../../../utils/date";

class SendingMoneyUseCase{
    constructor(private UserRepository: IUserRepository, private ExtractsRepository:IExtracsRepository){}

    async execute(id:number, keyPix:string, value:number){
            
        try {
            
            const user = await this.UserRepository.findUserById(id);
            const receiveUser = await this.UserRepository.findUserByKeyPix(keyPix);
            
            if(user.saldo<value){
                throw new AppError("Saldo Invalido para fazer o saque");
            }
            
            if(user.keypix === keyPix){
                throw new AppError("Voce nao pode enviar dinheiro para voce");
            }

            if(!receiveUser){
                throw new AppError("A Chave pix e invalida");
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

        } catch (error) {
            throw new AppError(error.message);
        }

       
    }
}

export { SendingMoneyUseCase };
