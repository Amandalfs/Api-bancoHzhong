import { IExtracsRepository } from "../../../../repositories/implementations/IExtractsRepository";

export interface DTORequestExtractsByDateUseCase {
    id_user: number,
    dateStart: string,
    dateEnd: string
}

export interface DTOResponseExtractsByDateUseCase {
    
}

export interface IExtractsByDateUseCase {
    
}

class ExtractsByDataUseCase{
    constructor(private ExtractsRepository: IExtracsRepository){} 

    async execute(id_user:number, dateStart:string, dateEnd:string){
        const extracts = await this.ExtractsRepository.SearchForDataStartAndEndbyId(id_user, dateStart, dateEnd);
        return extracts;
    }
}

export { ExtractsByDataUseCase };