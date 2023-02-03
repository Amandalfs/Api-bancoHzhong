const fs = require('fs');
const { get } = require('http')
const { join } = require('path');

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

const loginUsers = (app) => {
    app.route('/loginUsers')
        .get((req, res) => {
            const users = getUsers()
            let value = true;
            console.log(req.body['nameUser'], req.headers['senha']);
            users.map( user => {
                if(user.nameUser === req.body.nameUser && user.senha1 ===  req.headers.senha){
                    
                    value = false;
                    return res.status(200).send('OK')
                }
            })

            if(value){
                res.status(400).send("login error account")
                
            }
        })
}

module.exports = loginUsers;