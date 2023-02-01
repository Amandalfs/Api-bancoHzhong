const fs = require('fs')
const { post } = require('http');
const { join } = require('path');

 

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

const createUsers = (app) => {
    app.route('/createUsers/:id?')
        .post((req, res) => {
            const users = getUsers()
            let value = true;

            if(verifyCpf(req.body.cpf) || verifyAge(req.body.nasc) || checkSizeCpf(req.body.cpf) || req.body.senha1 !== req.body.senha2){
                value = false;
                return res.status(400).send("error create account")
            } 

            users.map(user => {
                if(user.email === req.body.email || user.cpf === req.body.cpf || user.nameUser === req.body.nameUser) {
                    value = false;
                    return res.status(400).send("error create account")
                }
            })

            if(value){
                users.push(req.body)
                saveUser(users)
    
                res.status(201).send('Ok')
            }
        })
}

function checkSizeCpf(cpf){
    if(cpf.length===11) {
        return false
    } else {
        return true
    }
}

function verifyCpf(cpf){
    let soma = 0;
    let soma2 = 0;
    const arrayValue = []; 
    const arrayValue2 = [];
    let cont = 10
    let cont2 = 11
    for(let c=0; c<9; c++) {
        arrayValue.push(cont*(parseInt(cpf[c])));
        cont--;
    }
    for(let el of arrayValue){
        soma+= el;
    }
    for(let c=0; c<9; c++){
        arrayValue2.push(cont2*(parseInt(cpf[c])));
        cont2--;
    }
    let result = 11-(soma%11);
    arrayValue2.push(2*result);

    for(let el of  arrayValue2){
        soma2+=el
    }
    let result2 = 11-(soma2%11);
    if(result<2){
        result = 0;
    }
    if(result<2){
        result = 0;
    }
    const conclusao = `${result}` + `${result2}`
    const comparacao = cpf[cpf.length-2]+cpf[cpf.length-1]
    if(conclusao===comparacao){
        return false;
    } else {
        return true;
    }
}

function verifyAge(nasc){
    const date = new Date();
    const year = date.getFullYear();
    const nascYear = nasc.slice(nasc.length-4)
    if(year-nascYear>=18) {
        return false
    } else {
        return true
    }

}

module.exports = createUsers;