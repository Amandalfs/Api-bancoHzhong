const fs = require('fs');
const { patch } = require('http');
const { join } = require('path');
const { send } = require('process');
const generatorDate = require('../utils/dateGenerator');
const date = require('../utils/date');
const pool = require('../sql/sqlconfig');

async function selectAll(){
    const dados = await pool.query('SELECT * FROM "dadosbanco"');
    return dados.rows;
}


const withdrawUser = (app) => {
    app.route('/withdrawUser')
        .patch(async(req, res) => {
            const users = await selectAll();
            let valueBoolean = true;
            await users.map((user, index, array)=>{
                if(req.body.username === user.username && req.headers.password === user.password){
                    const withdraw = Number(req.body.valueWithdraw)
                    if(withdraw < user.saldo ){
                        const withdrawDate = generatorDate()
                        const total = user.saldo - withdraw;
                        const desc = (`Sacou R$${withdraw.toFixed(2).replace('.',',')} em ${withdrawDate}`)

                        const sqlUptade = ('UPDATE dadosbanco SET saldo=$1 WHERE username like $2');
                        const valuesUpdate = [total, user.username];
                        pool.query(sqlUptade, valuesUpdate);

                        const sqlExtrato = ('INSERT INTO extrato(username,date, descricao) VALUES ($1,$2,$3)');
                        const valuesExtrato = [user.username, date(), desc];
                        pool.query(sqlExtrato, valuesExtrato);
                        
                        valueBoolean = false;
                        return res.status(201).send({"msg": "Saque efetuado com sucesso"});
                    }
                }
            })
            if(valueBoolean){
                res.status(400).send('Error Withdraw');
            }
        })
}

module.exports = withdrawUser;
