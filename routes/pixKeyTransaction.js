const fs = require('fs');
const { patch, get } = require('http');
const { join } = require('path');
const dateGenerator = require('../utils/dateGenerator')

const filePath = join(__dirname, 'users.json')

const getUsers = () => {
    const data = fs.existsSync(filePath)
        ?fs.readFileSync(filePath)
        :[]

    try {
        return JSON.parse(data)
    } catch (error) {
        return []
    }
}

const saveUser = (users) => fs.writeFileSync(filePath, JSON.stringify(users, null, '\t'));

const pixKeyTransaction = (app) =>{
    app.route('/pixKeyTransaction')
        .patch((req, res)=>{
            const users = getUsers();
            let valueBoolean = true;
            let valueBoolean2 = true;

            users.map((userSend, indexSend, arraySend)=>{
                const depositSend = Number(req.body.deposit);
                if(userSend.nameUser === req.body.nameUser && userSend.senha1 === req.headers.password){
                    valueBoolean = false;
                    if(userSend.balance>depositSend){
                        valueBoolean2 = false;
                        users.map((userReceive, indexReceive, arrayReceive)=>{
                            if(userReceive.keyPix === req.body.keyPix){
                                users[indexSend].balance -= depositSend;
                                users[indexSend].history.push(`Voce transferiu R$${depositSend.toFixed(2).replace('.',',')} para @${userReceive.nameUser} ${dateGenerator()}`);
                                users[indexReceive].balance += depositSend;
                                users[indexReceive].history.push(`Voce recebeu R${depositSend.toFixed(2).replace('.',',')} de @${userSend.nameUser} ${dateGenerator()}`);
                                saveUser(users);
                                return res.status(200).send(userSend.history[userSend.history.length-1]);
                            }
                        })
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