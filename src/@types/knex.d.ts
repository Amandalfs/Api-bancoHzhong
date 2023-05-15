import { knex } from 'knex'

declare module 'knex/types/tables'{
    export interface Tables{
        users:{
            id?: number, 
            name: string,
            username: string,
            password: string,
            nasc: string,
            typeaccont: string,
            saldo: number,
            agencia: string,
            cpf: string,
            keypix?:string,
        }

        extratos: {
            id?: number,
            id_user: number,
            name: string,
            tipo: string,
            saldo: number,
            data: string,
            descricao: string,
        }

        cofres: {
            id?: number,
            id_user: number,
            name_cofre: string,
            saldo: number,
            meta?: string,
            isMeta?: string,
        }
    }
}