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
            const {dateInicial, dateFinal, username} = req.query
            let valueBoolean = true;

            await users.map(async(user, index)=>{
                if(username === user.username){
                    valueBoolean = false;
                    const sqlEx = await('SELECT * FROM extrato WHERE username like $1 AND BETWEEN $2 AND $3');
                    const valuesEx = await[user.username, dateInicial, dateFinal];
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