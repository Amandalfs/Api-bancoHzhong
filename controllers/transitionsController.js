const generatorDate = require('../utils/dateGenerator');
const dbUsers = require('../sql/dbUsers');
const dbExtratos = require('../sql/dbExtratos');
const date = require('../utils/date');
const db = require('../sql/knex');

const AppError = require('../utils/AppError');

const useCaseTransaction = async(id, valorTransferir) =>{
    const user = await dbUsers.getUserById({id: id})
    
    if(user.saldo<valorTransferir){
        throw new AppError("Saldo Invalido para fazer o saque");
    }
    
}

const useCaseWithdraw = (valueWithdraw, saldo)=>{
    if(valueWithdraw<0){
        throw new AppError("Saldo invalido");
    }

    if(valueWithdraw>saldo){
        throw new AppError("Saldo insuficiente para fazer saque");
    }
}

class TransitionsController{
    async deposit(req, res){
        const { deposit } = req.body;
        const { id } = req.user;

        const tipo = "deposito";
        const data = generatorDate();

        const user = await dbUsers.getUserById({id: id});

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

        await dbExtratos.createExtrato(extratoNew)
        await dbUsers.updateUser({id: id}, {saldo: saldoNovo})

        return res.status(202).send("Deposito efetuado com sucesso");
    }

    async withdraw(req, res){
        const { valueWithdraw } = req.body;
        const { id } = req.user;
        const user = await dbUsers.getUserById({id: id});

        useCaseWithdraw(valueWithdraw, user.saldo);
        
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

        await dbExtratos.createExtrato(extratoNew)
        await dbUsers.updateUser({id: id}, {saldo: saldoNovo})

        return res.status(202).send({"Saque efetuado com sucesso":valueWithdraw});
    }

    async transaction(req, res){
        const { id } = req.user;
        const {deposit, keypix } = req.body;

        useCaseTransaction(id, deposit);

        const myUser = await dbUsers.getUserById({id:id});
        const receiveUser = await db('users').where("keypix", keypix).first();
        
        if(myUser.id === receiveUser.id){
            throw new AppError("Voce nao pode enviar dinheiro para voce");
        }

        const saldoReceive =  myUser.saldo - deposit;
        const saldoSend = receiveUser.saldo + deposit;

        const extrato = {
            send:{
                id_user: id,
                name: myUser.name,
                tipo: "transferencia(envio)",
                saldo: deposit,
                data: date(),
                descricao: `Voce transferiu R$${deposit.toFixed(2).replace('.',',')} para ${receiveUser.name}`,
            },
            receive: {
                id_user: receiveUser.id,
                name: receiveUser.name,
                tipo: "transferencia(recebido)",
                saldo: deposit,
                data: date(),
                descricao: `Voce recebeu R${deposit.toFixed(2).replace('.',',')} de ${myUser.name}`,
            }
            
        }
        
    
        await dbUsers.updateUser({id:id}, {saldo: saldoSend});
        await dbUsers.updateUser({id: receiveUser.id}, {saldo: saldoReceive});
        await dbExtratos.createExtrato(extrato.send);
        await dbExtratos.createExtrato(extrato.receive);
     
       return res.status(201).send({extrato});
    }

    async extract(req, res){
        const { id } = req.user
        const {dateInicial, dateFinal} = req.body

        const extratos = await dbExtratos.getAllExtratos({id_user: id},dateInicial, dateFinal)
        return res.status(201).send(extratos);

    }

    
}

module.exports = TransitionsController;