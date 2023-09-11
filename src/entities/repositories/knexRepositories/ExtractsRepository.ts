import { db } from "../../../sql/knex";
import { IExtracsRepository, IRequestCountBySending, IRequestCountByWithdraw, IRequestSearchForDataStartAndEndbyId } from "../implementations/IExtractsRepository";
import {IExtracts} from "../model/IExtracts";

class ExtractsRepository implements IExtracsRepository {
    revenuesExtractsByDays(data: { startDate: Date; endDate: Date; }): Promise<{ date: Date; value: number; }[]> {
        throw new Error("Method not implemented.");
    }
    expensesExtractsByDays(data: { startDate: Date; endDate: Date; }): Promise<{ date: Date; value: number; }[]> {
        throw new Error("Method not implemented.");
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

    async SearchForDataStartAndEndbyId({id, dateStart, dateEnd}: IRequestSearchForDataStartAndEndbyId){
        const extracts = await db('extratos')
        .select("tipo", "saldo", "data", "descricao")
        .where("id_user",id).where('data', '>=', dateStart)
        .where('data', '<=', dateEnd);

        return extracts;
    }

    async CountByWithdraw({dateStart, dateEnd, UserId}: IRequestCountByWithdraw): Promise<number> {
        const { sum: CountWithdraw } = await db("extratos")
        .where("id_user", UserId)
        .where('tipo','saque')
        .where('data', '>=', dateStart)
        .where('data', '<=', dateEnd)
        .sum("saldo").first();

        return CountWithdraw;
    }

    async CountBySending({dateStart, dateEnd, UserId }: IRequestCountBySending): Promise<number> {
        const { sum: countSending } = await db("extratos")
        .where("id_user", UserId)
        .where('tipo','envio')
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
                builder.where("tipo", "recebido").orWhere("tipo", "deposito");
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
                builder.where("tipo", "envio").orWhere("tipo", "Saque");
            }).sum("saldo").first();
        return expenses;
    }
}

export  { ExtractsRepository };