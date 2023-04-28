const db = require('../sql/knex/index');
const crypto = require('crypto');

async function keyGenerator(){
    const key = crypto.randomUUID().replace(/-/g, '').substring(0, 32)
    let keyFormatada = "";
    for(let indice in key){
        if(indice==8 || indice==16 || indice==24){
            keyFormatada += "-"
        }
        keyFormatada += key[indice];
    }
    const value = await db('users').where("keypix", keyFormatada);
    if(value.length==0){
        return keyFormatada
    } else {
        keyGenerator();
    }
}

keyGenerator()

module.exports = keyGenerator;