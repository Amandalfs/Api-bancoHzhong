const fs = require('fs');
const { get } = require('http');
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

const extractUsers = (app) =>{
    app.route('/extractUsers')
        .get(async(req, res)=>{
            try{
                const users = await getUsers();
                let valueBoolean = true;

                await users.map((user, index)=>{
                    if(req.body.nameUser === user.nameUser){
                        valueBoolean = false;
                        return res.status(200).send({
                            name: user.name,
                            balance: user.balance,
                            agency: user.agency,
                            id: user.id,
                            history: user.history})
                    }
                })

                if(valueBoolean){
                    return res.status(400).send("Error Extract");
                }
            }catch(error){
                console.log(error);
            }
        })
}

module.exports = extractUsers;