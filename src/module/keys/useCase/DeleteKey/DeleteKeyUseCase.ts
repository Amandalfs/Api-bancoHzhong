import { IUserRepository } from "../../../../repositories/implementations/IUserRepository";
import { ResourceNotFoundError } from "../../../../utils/errors/ResourceNotFoundError";
import { KeyDoesNotExistError } from "../errors/KeyDoesNotExistError";


class DeleteKeyUseCase{

    constructor(private UserRepository: IUserRepository){
    }

    async execute(id:number){
        const user = await this.UserRepository.findUserById(id);

        if(!user){
            throw new ResourceNotFoundError();
        }

        if(!user.keypix){
            throw new KeyDoesNotExistError();
        }

        await this.UserRepository.deleteKeyPixById(id);

        return {
            msg: "key delete success"
        }
    }
}

export { DeleteKeyUseCase }