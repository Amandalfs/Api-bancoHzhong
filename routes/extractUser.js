const { get } = require('http');
const { join } = require('path');
const pool = require('../sql/sqlconfig');

async function selectAll(){
    const dados = await pool.query('SELECT * FROM "dadosbanco"');
    return dados.rows;
}

const extractUser = (app) =>{
    app.route('/extractUsers')
        .get(async(req, res)=>{
            const users = await selectAll();
            let valueBoolean = true;

            await users.map(async(user, index)=>{
                if(req.body.username === user.username){
                    valueBoolean = false;
                    const sqlEx = await('SELECT * FROM extrato WHERE username like $1');
                    const valuesEx = await[user.username];
                    const folha = await pool.query(sqlEx, valuesEx)
                    return res.status(201).send(folha.rows);
                }
            })

            if(valueBoolean){
                return res.status(400).send("Error Extract");
            }
        })
}

module.exports = extractUser;