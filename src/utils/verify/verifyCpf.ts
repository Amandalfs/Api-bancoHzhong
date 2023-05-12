function verifyCpf(cpf:string): boolean{
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
    if(result2<2){
        result2 = 0;
    }
    const conclusao = `${result}` + `${result2}`
    const comparacao = cpf[cpf.length-2]+cpf[cpf.length-1]
    if(conclusao===comparacao){
        return false;
    } else {
        return true;
    }
}

export { verifyCpf };