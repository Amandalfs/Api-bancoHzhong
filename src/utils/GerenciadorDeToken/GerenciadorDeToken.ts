export interface GerenciadorDeToken {
    createToken(payload: object, privateKey: string, options: Options):string
    verifyToken(token: string, secket: string): object | null
}

export interface Options {
    subject: string
    expiresIn: string
}