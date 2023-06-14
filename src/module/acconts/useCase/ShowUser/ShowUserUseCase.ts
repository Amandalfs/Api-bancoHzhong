import { IExtracsRepository, IReponseExtracs } from "../../../../repositories/implementations/IExtractsRepository";
import { IUserRepository } from "../../../../repositories/implementations/IUserRepository";
import { ResourceNotFoundError } from "./errors";

export interface DTORequestShowUserUseCase {
    id_user: number
}

export interface DTOResponseShowUserUseCase {
    userSend: {
        name: string;
        username: string;
        saldo: number;
        typeaccont: string;
        keypix: string;
    };
    extracts: IReponseExtracs[];
}

export interface IShowUserUseCase {
    execute(data: DTORequestShowUserUseCase): Promise<DTOResponseShowUserUseCase>
}

class ShowUserUseCase implements IShowUserUseCase{

    constructor(private UserRepository: IUserRepository, private ExtractRepository:IExtracsRepository){} 

    async execute({id_user}: DTORequestShowUserUseCase){

        const user = await this.UserRepository.findUserById(id_user);
        
        if(!user){
            throw new ResourceNotFoundError();
        }
        const userSend = {
            name: user.name,
            username: user.username,
            saldo: user.saldo,
            typeaccont: user.typeaccont,
            keypix: user.keypix

        }
        const extracts = await this.ExtractRepository.SearchForMoreRecentExtractsById(id_user);
        const joinData = {
            userSend,
            extracts
        }

        return joinData;

    }
}

export { ShowUserUseCase }