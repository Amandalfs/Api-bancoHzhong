const e = require('express');
const garantirAuth = require('../middlewares/garantirAuth');
const dbExtratos = require('../sql/dbExtratos');


const validarDados = (req, res, next) =>{
    const {dateInicial, dateFinal} = req.body   

    let pattern = /^\d{4}-\d{2}$-\d{2}/;
    

    const errors = [];

    if(!dateInicial){
        errors.push("Preencha a data inicial")
    }

    if(!dateFinal){
        errors.push("Preencha a data final")
    }

    if(pattern.test(dateInicial) || !isNaN(dateInicial)){
        errors.push("Data Inicial invalida")
    }

    if(pattern.test(dateFinal) || !isNaN(dateFinal)){
        errors.push("Data Final invalida")
    }

    if(errors.length!==0){
       return res.status(401).send(errors);
    }

    next();
}

const extractUser = (app) =>{
    app.route('/users/extracts')
        .get(garantirAuth, validarDados, async(req, res)=>{
            const { id } = req.user
            const {dateInicial, dateFinal} = req.body

            const extratos = await dbExtratos.getAllExtratos({id_user: id},dateInicial, dateFinal)
            return res.status(201).send(extratos);


        })
}

module.exports = extractUser;