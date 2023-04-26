function checkSizeCpf(cpf){
    if(cpf.length===11) {
        return false
    } else {
        return true
    }
}

module.exports = checkSizeCpf;