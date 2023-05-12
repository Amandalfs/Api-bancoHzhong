import { AppError } from "./AppError";
import { checkSizeCpf } from "./verify/checkSizeCpf";
import { verifyCpf } from "./verify/verifyCpf";

const validarCPF = (cpf:string):void => {

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

export { validarCPF };