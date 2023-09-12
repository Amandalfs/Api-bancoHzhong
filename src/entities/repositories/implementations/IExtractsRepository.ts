import { IExtracts } from "../model/IExtracts"

export interface IReponseExtracs {
    tipo: string,
    saldo: number,
    data: Date,
    descricao: string,
}

export interface IRequestCountByWithdraw {
    dateStart: Date
    dateEnd: Date
    UserId: number
}

export interface IRequestCountBySending {
    dateStart: Date
    dateEnd: Date
    UserId: number
}

export interface IRequestSearchForDataStartAndEndbyId {
    id: number
    dateStart: Date,
    dateEnd: Date,
    page: number,
    rows: number
}


export interface IExtracsRepository {
    SearchForMoreRecentExtractsById(id_user:number): Promise<IReponseExtracs[]>

    createExtracts(data: IExtracts): Promise<void>

    SearchForDataStartAndEndbyId({id, dateStart, dateEnd, page, rows}:IRequestSearchForDataStartAndEndbyId): Promise<IReponseExtracs[]>

    CountByWithdraw(data: IRequestCountByWithdraw): Promise<number>

    CountBySending(data: IRequestCountBySending): Promise<number>

    findIncomesByDate(data: { id: number, today: Date, lastMonth: Date }): Promise<number>

    findExpensesByDate(data: { id: number, today: Date, lastMonth: Date }): Promise<number>

    revenuesExtractsByDays(data: { startDate: Date, endDate: Date, userId: number}): Promise<{date: Date, value: number}[]>

    expensesExtractsByDays(data: { startDate: Date, endDate: Date, userId: number}): Promise<{date: Date, value: number}[]>

    getCountDocs(data: { startDate: Date, endDate: Date, userId: number}): Promise<number>
}