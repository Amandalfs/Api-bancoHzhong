const fs = require('fs');
const { get } = require('http');
const { join } = require('path');
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

const depositUsers = (app) => {
    app.route('/depositUsers')
        .patch((req, res)=>{
            const users = getUsers()
            let valueBoolean = true;
            users.map((user, index, array)=>{
                if(user.nameUser===req.body.nameUser && user.senha1 === req.headers.password){
                    const deposit = Number(req.body.deposit);
                    users[index].balance += deposit;
                    users[index].history.push(`Depositou R$${deposit.toFixed(2).replace('.',',')} em ${generatorDate()}`)
                    saveUser(users);
                    valueBoolean = false;
                    res.status(200).send('OK');
                }
            })
            if(valueBoolean){
                res.status(400).send("Error Deposit");
            }
        })
}

module.exports = depositUsers;