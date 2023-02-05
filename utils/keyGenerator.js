function randowLetterNumber(){
    const numero = Math.ceil((Math.random())*35);
    if(numero>9){
        switch(numero-10){
            case 0: 
                return 'a'
            case 1:
                return 'b'
            case 2:
                return 'c'
            case 3:
                return 'd'
            case 4: 
                return 'e'
            case 5:
                return 'f'
            case 6:
                return 'g'
            case 7:
                return 'h'
            case 8:
                return 'i'
            case 9:
                return 'j'
            case 10:
                return 'k'
            case 11:
                return 'l'
            case 12:
                return 'm'
            case 13:
                return 'n'
            case 14:
                return 'o'
            case 15:
                return 'p'
            case 16:
                return 'q'
            case 17: 
                return 'r'
            case 18:
                return 's'
            case 19:
                return 't'
            case 20: 
                return 'u'
            case 21:
                return 'v'
            case 22:
                return 'w'
            case 23:
                return 'x'
            case 24: 
                return 'y'
            case 25: 
                return 'z'
        }
    } else {
        return String(numero)
    }
}

function keyGenerator(){
    let key = '';
    for(let c=1; c<=32; c++){
        if(c==8 || c==16 || c==24){
            key += '-'
        } else {
            key += randowLetterNumber()
        }
    }
    return key
}

module.exports = keyGenerator;