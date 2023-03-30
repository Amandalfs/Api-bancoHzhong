const { get } = require('http');
const { join } = require('path');
const generatorDate = require('../utils/dateGenerator');
const pool = require('../sql/sqlconfig');
const date = require('../utils/date');
const selectAll = require('../utils/selectAll');

const depositUsers = (app) => {
    app.route('/depositUser')
        .patch(async(req, res)=>{
            const users = await selectAll();
            let valueBoolean = await true;
            await users.map((user, index, array)=>{
                if(user.username===req.body.username && user.password === req.headers.password){
                    const deposit = Number(req.body.deposit);
                    const total = user.saldo+deposit
                    const desc = `Voce depositou R$${deposit.toFixed(2).replace('.',',')} em ${generatorDate()}`

                    const sqlExtrato = ('INSERT INTO extrato(username,date, descricao) VALUES ($1,$2,$3)');
                    const valuesExtrato = [user.username, date(), desc];
                    pool.query(sqlExtrato, valuesExtrato);

                    const sqlUptade = ('UPDATE dadosbanco SET saldo=$1 WHERE username like $2');
                    const valuesUpdate = [total, user.username];
                    pool.query(sqlUptade, valuesUpdate);

                    valueBoolean = false;
                    res.status(200).send({desc});
                }
            })
            if(valueBoolean){
                res.status(400).send("Error Deposit");
            }
        })
}

module.exports = depositUsers;