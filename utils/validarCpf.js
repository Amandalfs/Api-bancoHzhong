const AppError = require('./AppError');
const checkSizeCpf = require('./verify/checkSizeCpf');
const verifyCpf = require('./verify/verifyCpf');

const validarCPF = (cpf)=>{

    if(verifyCpf(cpf)){
        throw new AppError('CPF Invalido');
    }
    if(checkSizeCpf(cpf)){
        throw new AppError('tamanho do CPF e invalido');
    }
    if(!cpf){
        throw new AppError('Campo CPF nao foi preenchido');
    }
    
}   

module.exports = validarCPF;