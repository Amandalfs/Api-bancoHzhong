import { IExtracsRepository } from "../../../../repositories/implementations/IExtractsRepository";
import { AppError } from "../../../../utils/AppError";

class ExtractsByDataUseCase{
    constructor(private ExtractsRepository: IExtracsRepository){} 

    async execute(id_user:number, dateStart:string, dateEnd:string){

        try {

            const extracts = await this.ExtractsRepository.SearchForDataStartAndEndbyId(id_user, dateStart, dateEnd);

            return extracts;

        } catch (error) {
            throw new AppError(error.message);
        }

     ;

    }
}

export { ExtractsByDataUseCase };