const fs = require('fs');
const { get } = require('http');
const pool = require('../sql/sqlconfig');
const periodMonth = require('../utils/periodMonth')
const selectAll = require('../utils/selectAll');

const loginUser = (app) => {
    app.route('/loginUser')
        .get(async(req, res) => {
            let value = await true;
            const users = await selectAll();
            console.log(req.query);
            /* console.log(req.body['username'], req.headers['password']);
            console.log(users); */
            await users.map(async(user) => {
                if(user.username === req.query.username && user.password ===  req.query.password){
                    value = false;
                    // format de date select * from extrato where date = '2023-03-29'
                    const sql = await('SELECT * from extrato WHERE username like $1 AND date > $2 LIMIT 30');
                    const extrato = await pool.query(sql, [user.username, periodMonth()]);
                    const userData = {
                        "username": user.username,
                        "Saldo": user.saldo,
                        "extrato": extrato.rows 
                    }
                    res.status(200).send({userData});
                }
            })
            if(value){
                res.status(400).send("login error account")
            }

        })
}


module.exports = loginUser;