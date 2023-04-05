const fs = require('fs');
const { get } = require('http');
const pool = require('../sql/sqlconfig');
const selectAll = require('../utils/selectAll');

const loginUser = (app) => {
    app.route('/loginUser')
        .get(async(req, res) => {
            let value = await true;
            const users = await selectAll();
            await users.map(async(user) => {
                if(user.username === req.query.username && user.password ===  req.query.password){
                    value = false;
                    const userData = {
                        "username": user.username,
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