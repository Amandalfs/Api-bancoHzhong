import { db } from "../sql/knex";
import { IExtracsRepository } from "./implementations/IExtractsRepository";
import {IExtracts} from "./modal/IExtracts";

class ExtractsRepository implements IExtracsRepository {
    async SearchForMoreRecentExtractsById(id_user: number){
        return await db('extratos').select("tipo", "saldo", "data", "descricao").where("id_user",id_user).orderBy('data', 'desc').limit(5);
    }

    async createExtracts(data: IExtracts){
        await  db('extratos').insert(data);
    }

    async SearchForDataStartAndEndbyId(id:number, dateStart:string, dateEnd:string){
        return await db('extratos').select("tipo", "saldo", "data", "descricao").where("id_user",id).where('data', '>=', dateStart).where('data', '<=', dateEnd);
    }
}

export  {ExtractsRepository};