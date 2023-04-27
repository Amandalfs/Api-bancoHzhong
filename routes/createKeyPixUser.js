const { patch } = require('http');
const { join } = require('path');
const keyGenerator = require('../utils/keyGenerator')
const pool = require('../sql/sqlconfig');
const selectAll = require('../utils/selectAll');

const createKeyPixUser = (app) =>{
    app.route('/users/createKeyPixUser')
        .patch(async(req, res) =>{
            const users = await selectAll();   
            let valueBoolean = await true;

            await users.map(async(user, index, array)=>{
                if(req.body.username === user.username && req.headers.password === user.password && user.keypix === null){
                    const sqlKey = ('UPDATE dadosbanco SET keypix=$1 WHERE username like $2');
                    const valuesKey = [`${keyGenerator()}`, user.username];
                    const key = valuesKey[0];
                    pool.query(sqlKey, valuesKey);
    
                    valueBoolean = false;
                    return res.status(201).send({key});
                }
            })
            if(valueBoolean){
                return res.status(400).send('Error create KEYPIX/existing key')
            }
        })
}

module.exports = createKeyPixUser;