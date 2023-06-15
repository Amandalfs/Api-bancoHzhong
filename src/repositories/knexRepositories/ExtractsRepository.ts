import { db } from "../../sql/knex";
import { IExtracsRepository, IRequestCountByWithdraw } from "../implementations/IExtractsRepository";
import {IExtracts} from "../modal/IExtracts";

class ExtractsRepository implements IExtracsRepository {
    async SearchForMoreRecentExtractsById(id_user: number){
        return await db('extratos')
        .select("tipo", "saldo", "data", "descricao")
        .where("id_user",id_user).orderBy('data', 'desc')
        .limit(5);
    }

    async createExtracts(data: IExtracts){
        await  db('extratos').insert(data);
    }

    async SearchForDataStartAndEndbyId(id:number, dateStart:string, dateEnd:string){
        return await db('extratos')
        .select("tipo", "saldo", "data", "descricao")
        .where("id_user",id).where('data', '>=', dateStart)
        .where('data', '<=', dateEnd);
    }

    async CountByWithdraw({dateStart, dateEnd, UserId}: IRequestCountByWithdraw): Promise<number> {
        return await db("extratos")
        .where("id_user", UserId)
        .where('tipo','saque')
        .where('data', '>=', dateStart)
        .where('data', '<=', dateEnd)
        .count("saldo");
    }

    async CountBySending(dateStart: string, dateEnd: string, UserId: number): Promise<number> {
        return await db("extratos")
        .where("id_user", UserId)
        .where('tipo','envio')
        .where('data', '>=', dateStart)
        .where('data', '<=', dateEnd)
        .count("saldo");
    }
}

export  {ExtractsRepository};