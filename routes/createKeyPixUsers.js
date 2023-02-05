const fs = require('fs');
const { patch } = require('http');
const { join } = require('path');
const keyGenerator = require('../utils/keyGenerator')

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

const createKeyPixUsers = (app) =>{
    app.route('/createKeyPixUsers')
        .patch((req, res) =>{
            const users = getUsers();   
            let valueBoolean = true;

            users.map((user, index, array)=>{
                if(req.body.nameUser === user.nameUser && req.headers.password === user.senha1 && user.keyPix === undefined){
                    users[index].keyPix = `${keyGenerator()}`
                    saveUser(users)
                    valueBoolean = false;
                    return res.status(201).send(user.keyPix)
                }
            })
            if(valueBoolean){
                return res.status(400).send('Error create KEYPIX/existing key')
            }
        })
}

module.exports = createKeyPixUsers;