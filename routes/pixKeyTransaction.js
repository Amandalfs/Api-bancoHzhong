const { patch, get } = require('http');
const { join } = require('path');
const dateGenerator = require('../utils/dateGenerator');
const date = require('../utils/date');
const { pool } = require('../sql/sqlconfig')
const selectAll = require('../utils/selectAll');
const garantirAuth = require('../middlewares/garantirAuth');
const dbUsers = require('../sql/dbUsers');
const { error } = require('console');
const db = require('../sql/knex/index')
const dbExtratos = require('../sql/dbExtratos');

const NotAutheticPassword = async (req, res, next) =>{
    const { compare } = require('bcrypt')
    
    const { id } = req.user;
    const { password } = req.headers;

    const user = await dbUsers.getUserById({id: id});
    
    const passwordPassed = await compare(password, user.password);

    if(!passwordPassed){
        return res.status(401).send("Senha digitada esta errada")
    }

    next();
}

const validarKey = async(req, res, next) =>{
    const { keypix } = req.body;

    const errors = [];

    const user = await db('users').where("keypix", keypix).first();
    if(!user){
        errors.push("A Chave pix e invalida");
    }

    if(errors.length!==0){
        return res.status(401).send(errors);
    }


    next()
}

const useCaseTransaction = async(id, valorTransferir, res) =>{
    const user = await dbUsers.getUserById({id: id})
    
    if(user.saldo<valorTransferir){
        throw new Error("Saldo insuficiente")
    }
    
}

const pixKeyTransaction = (app) =>{
    app.route('/users/transaction')
        .patch(garantirAuth, NotAutheticPassword, validarKey, async(req, res)=>{
                const { id } = req.user;
                const {deposit, keypix } = req.body;

                useCaseTransaction(id, deposit);

                const myUser = await dbUsers.getUserById({id:id});
                const receiveUser = await db('users').where("keypix", keypix).first();
                

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
        })
}

module.exports = pixKeyTransaction;