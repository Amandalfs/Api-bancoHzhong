
export interface IReponseExtracs {
    tipo: string,
    saldo: number,
    data: string,
    descricao: string,
}

export interface IExtracsRepository {
    SearchForMoreRecentExtractsById(id_user:number): Promise<IReponseExtracs[]>

    createExtracts(data): Promise<void>

    SearchForDataStartAndEndbyId(id:number, dateStart:string, dateEnd:string): Promise<IReponseExtracs[]>
}