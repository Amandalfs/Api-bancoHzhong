import { IExtracts } from "../modal/IExtracts"

export interface IReponseExtracs {
    tipo: string,
    saldo: number,
    data: string,
    descricao: string,
}

export interface IRequestCountByWithdraw {
    dateStart: string
    dateEnd: string
    UserId: number
}

export interface IExtracsRepository {
    SearchForMoreRecentExtractsById(id_user:number): Promise<IReponseExtracs[]>

    createExtracts(data: IExtracts): Promise<void>

    SearchForDataStartAndEndbyId(id:number, dateStart:string, dateEnd:string): Promise<IReponseExtracs[]>

    CountByWithdraw(data: IRequestCountByWithdraw): Promise<number>

    CountBySending(dateStart: string, dateEnd: string, UserId: number): Promise<number>
}