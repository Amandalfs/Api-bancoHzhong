function checkSizeCpf(cpf:string):boolean {
    if(cpf.length===11) {
        return false
    } else {
        return true
    }
}

export { checkSizeCpf };