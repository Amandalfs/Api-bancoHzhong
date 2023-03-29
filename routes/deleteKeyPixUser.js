const { patch } = require('http');
const { join } = require('path');
const pool = require('../sql/sqlconfig');

async function selectAll(){
    const dados = await pool.query('SELECT * FROM "dadosbanco"');
    return dados.rows;
}


const deleteKeyPixUser = (app) => {
    app.route('/deleteKeyPixUser')
        .patch(async(req, res)=>{
            const users = await selectAll();
            let valueBoolean = true;

            await users.map((user, index, array)=>{
                if(req.body.username === user.username && req.headers.password === user.password && user.keypix !== null){

                    const sql = ('UPDATE dadosbanco SET keypix=null WHERE username like $1');
                    const values = [user.username];
                    pool.query(sql, values);
                    valueBoolean = false;
                    return res.status(200).send({"msg": "Successfully deleted key"});
                }
            })
            if(valueBoolean){
                return res.status(400).send('Unable to delete, key does not exist');
            }
        })
}

module.exports = deleteKeyPixUser;