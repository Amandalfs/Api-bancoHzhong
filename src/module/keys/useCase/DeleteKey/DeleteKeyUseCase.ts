import { IUserRepository } from "../../../../repositories/implementations/IUserRepository";
import { AppError } from "../../../../utils/AppError";


class DeleteKeyUseCase{

    constructor(private UserRepository: IUserRepository){
    }

    async execute(id:number){
        const user = await this.UserRepository.findUserById(id);

        if(!user.keypix){
            throw new AppError("Chave pix nao existe");
        }

        await this.UserRepository.deleteKeyPixById(id);
    }
}

export { DeleteKeyUseCase }