
export interface GerenciadorDeToken {
    createToken(payload: object, privateKey: string, options: Options):string
}

export interface Options {
    subject: string
    expiresIn: string
}