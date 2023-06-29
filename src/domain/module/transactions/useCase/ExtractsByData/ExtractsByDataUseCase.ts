import { IExtracsRepository, IReponseExtracs } from "./protocols";

export class DTORequestExtractsByDateUseCase {
    public id_user: number
    public dateStart: string
    public dateEnd: string
    constructor(id: number, start: string, end: string){
        this.id_user = id;
        this.dateStart = start;
        this.dateEnd = end;
    }
}

export class DTOResponseExtractsByDateUseCase {
    public extracts: IReponseExtracs[]
    constructor(extracts: IReponseExtracs[]){
        this.extracts = extracts;
    }
}

export interface IExtractsByDateUseCase {
    execute(data: DTORequestExtractsByDateUseCase): Promise<DTOResponseExtractsByDateUseCase>
}

class ExtractsByDataUseCase implements IExtractsByDateUseCase{
    constructor(private ExtractsRepository: IExtracsRepository){} 

    async execute({id_user, dateStart, dateEnd}: DTORequestExtractsByDateUseCase){
        const extracts = await this.ExtractsRepository.SearchForDataStartAndEndbyId({id:id_user, dateStart, dateEnd});
        return new DTOResponseExtractsByDateUseCase(extracts);
    }
}

export { ExtractsByDataUseCase };