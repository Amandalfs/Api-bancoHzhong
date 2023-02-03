const fs = require('fs');
const { patch } = require('http');
const { join } = require('path');
const { send } = require('process');

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
        .patch((req, res) => {
            const users = getUsers()
            let valueBoolean = true;
            users.map((user, index, array)=>{
                if(req.body.nameUser === user.nameUser && req.headers.senha === user.senha1){
                    const withdraw = Number(req.body.valueWithdraw)
                    if(withdraw < user.balance ){
                        const withdrawDate = generatorDate()
                        users[index].balance -= withdraw
                        users[index].history.push(`sacou R$${withdraw.toFixed(2).replace('.',',')} em ${withdrawDate}`)
                        saveUser(users)
                        valueBoolean = false;
                        return res.status(201).send('OK');
                    }
                }
            })
            if(valueBoolean){
                res.status(400).send('Error Withdraw');
            }
        })
}

function generatorDate() {
    const date = new Date();
    const day = date.getDate().toString().padStart(2,0);
    const year = date.getFullYear()
    const month = (date.getMonth()+1).toString().padStart(2,0);
    const hours = date.getHours().toString().padStart(2,0);
    const minutes = date.getMinutes().toString().padStart(2,0);

    return `${hours}:${minutes} ${day}/${month}/${year}`
}

module.exports = withdrawUsers;