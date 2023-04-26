const { post } = require('http');
const { join } = require('path');
const verifyCpf = require('../utils/verifyCpf');
const verifyAge = require('../utils/verifyAge');
const checkSizeCpf = require('../utils/checkSizeCpf');
const pool = require('../sql/sqlconfig');
const selectAll = require('../utils/selectAll');

const validarCPF = (req, res, next)=>{
    const {cpf} = req.body;
    const errors = [];
    if(verifyCpf(cpf)){
        errors.push('CPF Invalido');
    }
    if(checkSizeCpf(cpf)){
        errors.push('tamanho do CPF e invalido');
    }
    if(!cpf){
        errors.push('Campo CPF nao foi preenchido');
    }
    if(errors.length!==0){
        res.status(400).send({errors})
        return
    }

    next()

}


const createUser = (app) => {
    app.route('/createUser')
        .post(validarCPF,async (req, res) => {
            const users = await selectAll();
            let value = true;
            if(verifyAge(req.body.nasc)||( req.headers.password !== req.headers.password2)){
                value = false;
                return res.status(400).send("error create account")
            }
            users.map((user) => {
                if(user.email === req.body.email || user.cpf === req.body.cpf || user.username === req.body.username) {
                    value = false;
                    return res.status(400).send("error cpf or email invalid");
                }
            })

            if(value){
                pool.connect()
                const sql = 'INSERT INTO dadosbanco(name, username, password, nasc, typeaccont, numero, agencia, saldo, email, cpf) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);';
                const values = [req.body.name, req.body.username, req.headers.password, req.body.nasc, req.body.typeaccont, 153, '003', 0, req.body.email, req.body.cpf];
                pool.query(sql, values);
                res.status(201).send('Create Accont Success');
            }
        })
}
module.exports = createUser;