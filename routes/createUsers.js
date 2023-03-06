const fs = require('fs')
const { post } = require('http');
const { join } = require('path');
const verifyCpf = require('../utils/verifyCpf');
const verifyAge = require('../utils/verifyAge');
const checkSizeCpf = require('../utils/checkSizeCpf');

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

const createUsers = (app) => {
    app.route('/createUsers/:id?')
        .post(async (req, res) => {
            try{
            const users = await getUsers()
            let value = true;
            if(verifyCpf(req.body.cpf) || verifyAge(req.body.nasc) || checkSizeCpf(req.body.cpf) ||( req.body.senha1 !== req.body.senha2)){
                value = false;
                return res.status(400).send("error create account 2")
            }
            users.map((user) => {
                if(user.email === req.body.email || user.cpf === req.body.cpf || user.nameUser === req.body.nameUser) {
                    value = false;
                    return res.status(400).send("error cpf or email invalid");
                }
            })

            if(value){
                const objetcNew = {
                    ...req.body,
                    balance: 0,
                    history: [],
                    agency: '001',
                    number: '451'
                }
                await users.push(objetcNew)
                await saveUser(users)
                res.status(201).send({users})
            }
            } catch(e){

            }
        })
}
module.exports = createUsers;