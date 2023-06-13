import { IUserRepository } from "../../../../repositories/implementations/IUserRepository";
import { ResourceNotFoundError } from "../../../../utils/errors/ResourceNotFoundError";
import { KeyDoesNotExistError } from "../errors/KeyDoesNotExistError";

export interface DTORequestDeleteKeyUseCase {
    id: number
}

export interface DTOResponseDeleteKeyUseCase {
    msg: string
}

export interface IDeleteKeyUseCase{
    execute(data: DTORequestDeleteKeyUseCase): Promise<DTOResponseDeleteKeyUseCase>
}

class DeleteKeyUseCase implements IDeleteKeyUseCase{

    constructor(private UserRepository: IUserRepository){
    }

    async execute({id}: DTORequestDeleteKeyUseCase){
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