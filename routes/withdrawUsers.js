const fs = require('fs');
const { patch } = require('http');
const { join } = require('path');
const { send } = require('process');
const generatorDate = require('../utils/dateGenerator');

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

const withdrawUsers = (app) => {
    app.route('/withdrawUsers')
        .patch(async(req, res) => {
            try{
            const users = await getUsers()
            let valueBoolean = true;
            await users.map((user, index, array)=>{
                if(req.body.nameUser === user.nameUser && req.headers.senha === user.senha1){
                    const withdraw = Number(req.body.valueWithdraw)
                    if(withdraw < user.balance ){
                        const withdrawDate = generatorDate()
                        users[index].balance -= withdraw
                        users[index].history.push(`Sacou R$${withdraw.toFixed(2).replace('.',',')} em ${withdrawDate}`)
                        saveUser(users)
                        valueBoolean = false;
                        return res.status(201).send('OK');
                    }
                }
            })
            if(valueBoolean){
                res.status(400).send('Error Withdraw');
            }
            }catch(erro){
                console.log(erro)
            }
        })
}

module.exports = withdrawUsers;
