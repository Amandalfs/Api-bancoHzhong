const AppError = require("../../utils/AppError");
const date = require("../../utils/date");

module.exports = class TransitionsUserByUser2Service{

    userRepository;
    extractsRepository;
    constructor(UserRepository, ExtractsRepository){
        this.userRepository = UserRepository;
        this.extractsRepository = ExtractsRepository;
    }



    async execute(id, keyPix, value){
            
        try {
            
            const user = await this.userRepository.findUserById(id);
            const receiveUser = await this.userRepository.findUserByKeyPix(keyPix);
            
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
                    descricao: `Voce transferiu R$${deposit.toFixed(2).replace('.',',')} para ${receiveUser.name}`,
                },
                receive: {
                    id_user: receiveUser.id,
                    name: receiveUser.name,
                    tipo: "transferencia(recebido)",
                    saldo: value,
                    data: date(),
                    descricao: `Voce recebeu R${deposit.toFixed(2).replace('.',',')} de ${myUser.name}`,
                }
                
            }
    
            await this.extractsRepository.createExtracts(extratos.send);
            await this.extractsRepository.createExtracts(extratos.receive);
    
            await this.extractsRepository.updateBalanceById(user.id, saldoSend);
            await this.extractsRepository.updateBalanceById(receiveUser.id, saldoReceive);
            return extratos;

        } catch (error) {
            throw new AppError(error.message);
        }

       
    }
}