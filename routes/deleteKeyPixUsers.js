const fs = require('fs');
const { patch } = require('http');
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

const deleteKeyPixUsers = (app) => {
    app.route('/deleteKeyPixUsers')
        .patch(async(req, res)=>{
            try{
                const users = await getUsers()
                let valueBoolean = true;

                await users.map((user, index, array)=>{
                    if(req.body.nameUser === user.nameUser && req.headers.password === user.senha1 && user.keyPix !== undefined){
                        delete users[index].keyPix;
                        saveUser(users)
                        valueBoolean = false;
                        return res.status(200).send({user})
                    }
                })
                if(valueBoolean){
                    return res.status(400).send('Unable to delete, key does not exist')
                }
            }catch(error){
                console.log(error);
            }
        })
}

module.exports = deleteKeyPixUsers;