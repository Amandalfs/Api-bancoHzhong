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
}


export interface IExtracsRepository {
    SearchForMoreRecentExtractsById(id_user:number): Promise<IReponseExtracs[]>

    createExtracts(data: IExtracts): Promise<void>

    SearchForDataStartAndEndbyId({id, dateStart, dateEnd}:IRequestSearchForDataStartAndEndbyId): Promise<IReponseExtracs[]>

    CountByWithdraw(data: IRequestCountByWithdraw): Promise<number>

    CountBySending(data: IRequestCountBySending): Promise<number>
}