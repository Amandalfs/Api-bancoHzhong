import { db } from "../../../sql/knex";
import { IExtracsRepository, IRequestCountBySending, IRequestCountByWithdraw, IRequestSearchForDataStartAndEndbyId } from "../implementations/IExtractsRepository";
import {IExtracts} from "../model/IExtracts";

class ExtractsRepository implements IExtracsRepository {
    
    async SearchForMoreRecentExtractsById(id_user: number){
        const extracts = await db('extratos')
        .select("tipo", "saldo", "data", "descricao")
        .where("id_user",id_user).orderBy('data', 'desc')
        .limit(5);
        return extracts;
    }

    async createExtracts(data: IExtracts){
        await  db('extratos').insert(data);
    }

    async SearchForDataStartAndEndbyId({id, dateStart, dateEnd}: IRequestSearchForDataStartAndEndbyId){
        const extracts = await db('extratos')
        .select("tipo", "saldo", "data", "descricao")
        .where("id_user",id).where('data', '>=', dateStart)
        .where('data', '<=', dateEnd);

        return extracts;
    }

    async CountByWithdraw({dateStart, dateEnd, UserId}: IRequestCountByWithdraw): Promise<number> {
        const count: number = await db("extratos")
        .where("id_user", UserId)
        .where('tipo','saque')
        .where('data', '>=', dateStart)
        .where('data', '<=', dateEnd)
        .count("saldo");

        return count;
    }

    async CountBySending({dateStart, dateEnd, UserId }: IRequestCountBySending): Promise<number> {
        const count: number = await db("extratos")
        .where("id_user", UserId)
        .where('tipo','envio')
        .where('data', '>=', dateStart)
        .where('data', '<=', dateEnd)
        .count("saldo");

        return count;
    }

    async findIncomesByDate({ id, lastMonth, today }: { id: number; today: Date; lastMonth: Date; }): Promise<number> {
        const count: number = await db("extratos")
        .where("id_user", id)
        .where((builder) => {
            builder.where("tipo", "recebido").orWhere("tipo", "deposito");
        })
        .where('data', '>=', lastMonth)
        .where('data', '<=', today)
        .count("saldo");

        return count;
    }

    async findExpensesByDate({ id, lastMonth, today }: { id: number; today: Date; lastMonth: Date; }): Promise<number> {
        const count: number = await db("extratos")
        .where("id_user", id)
        .where('data', '>=', lastMonth)
        .where('data', '<=', today)
        .orWhere("tipo","envio")
        .where((builder) => {
            builder.where("tipo", "envio").orWhere("tipo", "Saque");
        })
        .count("saldo");

        return count;
    }
}

export  { ExtractsRepository };