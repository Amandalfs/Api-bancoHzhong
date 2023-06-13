import { IUserRepository } from "../../../../repositories/implementations/IUserRepository";

import { ResourceNotFoundError } from "../../../../utils/errors/ResourceNotFoundError";
import { KeyDoesNotExistError } from "../errors/KeyDoesNotExistError";

export interface DTORequestShowKeyUseCase{
    id: number
}

export interface DTOResponseShowKeyUseCase{
    key: string
}

export interface IShowKeyUseCase{
    execute(data: DTORequestShowKeyUseCase): Promise<DTOResponseShowKeyUseCase>
}

class ShowKeyUseCase implements IShowKeyUseCase{
    constructor(private UserRepository: IUserRepository){}

    async execute({id}: DTORequestShowKeyUseCase){
        const user = await this.UserRepository.findUserById(id);

        if(!user){
            throw new ResourceNotFoundError();
        }

        if(!user.keypix){
            throw new KeyDoesNotExistError();
        }

        return {key:user.keypix};
    }
}

export { ShowKeyUseCase };