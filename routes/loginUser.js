const fs = require('fs');
const { get } = require('http');
const pool = require('../sql/sqlconfig');


async function select(){
    const dados = await pool.query('SELECT * FROM "dadosbanco"');
    return dados.rows;
}

const loginUser = (app) => {
    app.route('/loginUser')
        .get(async(req, res) => {
            let value = await true;
            const users = await select();
            /* console.log(req.body['username'], req.headers['password']);
            console.log(users); */
            await users.map(user => {
                if(user.username === req.body.username && user.password ===  req.headers.password){
                    value = false;
                    res.status(200).send('OK');
                }
            })
            if(value){
                res.status(400).send("login error account")
            }

        })
}

module.exports = loginUser;