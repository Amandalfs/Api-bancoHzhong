const { patch, get } = require('http');
const { join } = require('path');
const dateGenerator = require('../utils/dateGenerator');
const date = require('../utils/date');
const pool = require('../sql/sqlconfig')

async function selectAll(){
    const dados = await pool.query('SELECT * FROM "dadosbanco"');
    return dados.rows;
}


const pixKeyTransaction = (app) =>{
    app.route('/pixKeyTransaction')
        .patch(async(req, res)=>{
                const users = await selectAll();
                let valueBoolean = true;
                let valueBoolean2 = true;

                await users.map(async(userSend, indexSend, arraySend)=>{
                        const depositSend = await Number(req.body.deposit);
                        if(userSend.username === req.body.username && userSend.password === req.headers.password){
                            valueBoolean = false;
                            if(userSend.saldo>depositSend){
                                valueBoolean2 = false;
                                await users.map((userReceive, indexReceive, arrayReceive)=>{
                                    if(userReceive.keypix === req.body.keypix){
                                        const valueSend = userSend.saldo-depositSend;
                                        const descSend = (`Voce transferiu R$${depositSend.toFixed(2).replace('.',',')} para @${userReceive.username} ${dateGenerator()}`);
                                        
                                        const sqlSendUp = ('UPDATE dadosbanco SET saldo=$1 WHERE username like $2');
                                        pool.query(sqlSendUp, [valueSend, userSend.username]);

                                        const sqlSendEx = ('INSERT INTO extrato(username,date,descricao) VALUES ($1,$2,$3)');
                                        const result = pool.query(sqlSendEx, [userSend.username, date(), descSend]);
                                        

                                        const valueReceive = userReceive.saldo+depositSend;
                                        const descReceive = (`Voce recebeu R${depositSend.toFixed(2).replace('.',',')} de @${userSend.username} ${dateGenerator()}`);

                                        const sqlReceiveUp = ('UPDATE dadosbanco SET saldo=$1 WHERE username like $2');
                                        pool.query(sqlReceiveUp, [valueReceive, userReceive.username]);

                                        const sqlReceiveEx = ('INSERT INTO extrato(username, date, descricao) VALUES ($1, $2, $3)');
                                        pool.query(sqlReceiveEx, [userReceive.username, date(), descReceive]);


                                        return res.status(200).send({descSend});
                                    }
                                })
                            }  else {
                                return res.status(400).send('Error KeyPix invalidate');
                            }

                        }

                })

                if(valueBoolean){
                    return res.status(400).send('account does not exist')
                }
                
                if(valueBoolean2){
                    return res.status(400).send('insufficient fund')
                }
        })
}

module.exports = pixKeyTransaction;