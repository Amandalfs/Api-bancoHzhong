import { IExtracsRepository } from "../../../../repositories/implementations/IExtractsRepository";
import { IUserRepository } from "../../../../repositories/implementations/IUserRepository";
import { AppError } from "../../../../utils/AppError";

class ShowUserUseCase {

    constructor(private UserRepository: IUserRepository, private ExtractRepository:IExtracsRepository){} 

    async execute(id_user:number){

        const user = await this.UserRepository.findUserById(id_user);
        
        if(!user){
            throw new AppError("Usuario nao encontrado");
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