const AppError = require('../utils/AppError');
const checkSizeCpf = require('../utils/verify/checkSizeCpf');
const verifyCpf = require('../utils/verify/verifyCpf');

const validarCPF = (req, res, next)=>{

    const { cpf } = req.headers;

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
        throw new AppError(errors);
    }

    next()

}   

module.exports = validarCPF;