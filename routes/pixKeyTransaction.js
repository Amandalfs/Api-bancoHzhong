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
        .patch(async(req, res)=>{
            try{
                const users = await getUsers();
                let valueBoolean = true;
                let valueBoolean2 = true;

                await users.map(async(userSend, indexSend, arraySend)=>{
                    try{
                        const depositSend = await Number(req.body.deposit);
                        if(userSend.nameUser === req.body.nameUser && userSend.senha1 === req.headers.password){
                            valueBoolean = false;
                            if(userSend.balance>depositSend){
                                valueBoolean2 = false;
                                await users.map((userReceive, indexReceive, arrayReceive)=>{
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
                    }catch(erro2){
                        console.log(erro2)
                    }

                })

                if(valueBoolean){
                    return res.status(400).send('account does not exist')
                }
                
                if(valueBoolean2){
                    return res.status(400).send('insufficient fund')
                }
            }catch(error){
                console.log(error);
            }
        })
}

module.exports = pixKeyTransaction;