import { IExtracsRepository, IReponseExtracs } from "../../../../repositories/implementations/IExtractsRepository";

export interface DTORequestExtractsByDateUseCase {
    id_user: number,
    dateStart: string,
    dateEnd: string
}

export interface DTOResponseExtractsByDateUseCase {
    extracts: IReponseExtracs[]
}

export interface IExtractsByDateUseCase {
    execute(data: DTORequestExtractsByDateUseCase): Promise<DTOResponseExtractsByDateUseCase>
}

class ExtractsByDataUseCase implements IExtractsByDateUseCase{
    constructor(private ExtractsRepository: IExtracsRepository){} 

    async execute({id_user, dateStart, dateEnd}: DTORequestExtractsByDateUseCase){
        const extracts = await this.ExtractsRepository.SearchForDataStartAndEndbyId({id:id_user, dateStart, dateEnd});
        return {extracts};
    }
}

export { ExtractsByDataUseCase };