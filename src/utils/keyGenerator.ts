import crypto from "crypto"

interface IKeyGenerator {
    execute(): string;
}

class KeyGeneratorAdapterCrypto implements IKeyGenerator {
    execute(): string {
        const key = crypto.randomUUID().replace(/-/g, '').substring(0, 32)
        let keyFormatada = "";
        for(let indice:number = 0; indice<key.length; indice++){
            if(indice==8 || indice==16 || indice==24){
                keyFormatada += "-"
            }
            keyFormatada += key[indice];
        }
    
        return keyFormatada;
    }

}




export { IKeyGenerator, KeyGeneratorAdapterCrypto};