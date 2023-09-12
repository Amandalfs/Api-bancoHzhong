import { db } from "../../../sql/knex";
import { IExtracsRepository, IRequestCountBySending, IRequestCountByWithdraw, IRequestSearchForDataStartAndEndbyId } from "../implementations/IExtractsRepository";
import {IExtracts} from "../model/IExtracts";

class ExtractsRepository implements IExtracsRepository {
    async getCountDocs({ userId, startDate, endDate }: { startDate: Date; endDate: Date; userId: number; }): Promise<number> {
        const { count: total } = await db('extratos')
        .where("id_user", userId)
        .where('data', '>=', startDate)
        .where('data', '<=', endDate)
        .count("id").first();
        return Number(total);
    }
    
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

    async SearchForDataStartAndEndbyId({id, dateStart, dateEnd, page, rows}: IRequestSearchForDataStartAndEndbyId){
        const extracts = await db('extratos')
        .select("tipo", "saldo", "data", "descricao")
        .where("id_user",id).where('data', '>=', dateStart)
        .where('data', '<=', dateEnd)
        .limit(rows)
        .offset(rows*(page-1))
        .orderBy("data", "desc");

        return extracts;
    }

    async CountByWithdraw({dateStart, dateEnd, UserId}: IRequestCountByWithdraw): Promise<number> {
        const { sum: CountWithdraw } = await db("extratos")
        .where("id_user", UserId)
        .whereILike('tipo','Saque')
        .where('data', '>=', dateStart)
        .where('data', '<=', dateEnd)
        .sum("saldo").first();

        return CountWithdraw;
    }

    async CountBySending({dateStart, dateEnd, UserId }: IRequestCountBySending): Promise<number> {
        const { sum: countSending } = await db("extratos")
        .where("id_user", UserId)
        .whereILike('tipo','envio')
        .where('data', '>=', dateStart)
        .where('data', '<=', dateEnd)
        .sum("saldo").first();

        return countSending;
    }

    async findIncomesByDate({ id, lastMonth, today }: { id: number; today: Date; lastMonth: Date; }): Promise<number> {
        const { sum: incomes } = await db("extratos")
            .where("id_user", id)
            .where('data', '>=', lastMonth)
            .where('data', '<=', today)
            .where((builder) => {
                builder.whereILike("tipo", "recebido").orWhereILike("tipo", "deposito");
            })
            .sum("saldo").first();
        return incomes;
}

    async findExpensesByDate({ id, lastMonth, today }: { id: number; today: Date; lastMonth: Date; }): Promise<number> {
        const { sum: expenses } = await db("extratos")
            .where("id_user", id)
            .where('data', '>=', lastMonth)
            .where('data', '<=', today)
            .where((builder) => {
                builder.whereILike("tipo", "envio").orWhereILike("tipo", "Saque");
            }).sum("saldo").first();
        return expenses;
    }

    async revenuesExtractsByDays({ endDate, startDate, userId }: { startDate: Date; endDate: Date; userId: number }): Promise<{ date: Date; value: number; }[]> {
        const extracts: {
            date: Date,
            value: number
        }[] = await db("extratos")
            .select(
                db.raw('CAST(data AS DATE) as date'),
                db.raw('SUM(saldo) as value')
            )
            .where('id_user', userId)
            .where('data', '>=', startDate)
            .where('data', '<=', endDate)
            .where((builder) => {
                builder.whereILike("tipo", "deposito").orWhereILike("tipo", "recebido");
            })
            .groupByRaw('CAST(data AS DATE)')
            
        return extracts;
    }

    async expensesExtractsByDays({ userId, endDate, startDate }: { startDate: Date; endDate: Date; userId: number }): Promise<{ date: Date; value: number; }[]> {
        const extracts: {
            date: Date,
            value: number
        }[] = await db("extratos")
            .select(
                db.raw('CAST(data AS DATE) as date'),
                db.raw('SUM(saldo) as value')
            )
            .where('id_user', userId)
            .where('data', '>=', startDate)
            .where('data', '<=', endDate)
            .where((builder) => {
                builder.whereILike("tipo", "envio").orWhereILike("tipo", "Saque");
            })
            .groupByRaw('CAST(data AS DATE)')
            
        return extracts;
    }
}

export  { ExtractsRepository };