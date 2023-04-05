/* const sql = await('SELECT * from extrato WHERE username like $1 AND date > $2 LIMIT 5');
const extrato = await pool.query(sql, [user.username, periodMonth()]); */
// format de date select * from extrato where date = '2023-03-29'
const pool = require('../../sql/sqlconfig');
const selectAll = require('../../utils/selectAll');
const periodMonth = require('../../utils/periodMonth');



const userAccont = (app) =>{
    app.route('/users/userAconnt')
        .get(async(req, res)=>{
            let valueBoolean = true;
            const users = await selectAll();
            users.map(async(user)=>{
                if(user.username === req.query.username){
                    valueBoolean = false
                    const sql = await('SELECT * from extrato WHERE username like $1 AND date > $2 LIMIT 5');
                    const extrato = await pool.query(sql, [user.username, periodMonth()]);
                    const dados = await {
                        "username": user.username,
                        "saldo": user.saldo,
                        "extrato": extrato.rows
                    }
                    return res.status(201).send({dados});
                } 
            })
            if(valueBoolean){
                return res.status(400).send("Error")
            }
        })
}

module.exports = userAccont;