import { IUserRepository } from "../../../../repositories/implementations/IUserRepository";
import { AppError } from "../../../../utils/AppError";
import { ResourceNotFoundError } from "../../../../utils/errors/ResourceNotFoundError";


class DeleteKeyUseCase{

    constructor(private UserRepository: IUserRepository){
    }

    async execute(id:number){
        const user = await this.UserRepository.findUserById(id);

        if(!user){
            throw new ResourceNotFoundError();
        }

        if(!user.keypix){
            throw new AppError("Chave pix nao existe");
        }

        await this.UserRepository.deleteKeyPixById(id);

        return {
            msg: "key delete success"
        }
    }
}

export { DeleteKeyUseCase }