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

module.exports = verifyAge;