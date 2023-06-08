import { IUserRepository } from "../../../../repositories/implementations/IUserRepository";

import {keyGenerator} from "../../../../utils/keyGenerator";
import { ResourceNotFoundError } from "../../../../utils/errors/ResourceNotFoundError";
import { KeyAlreadyExistsError } from "./errors/KeyAlreadyExistsError";

class CreateKeyUseCase{

    constructor(private UserRepository: IUserRepository){}

    async execute(id:number){
        const user = await this.UserRepository.findUserById(id);

        if(!user){
            throw new ResourceNotFoundError();
        }

        if(user.keypix){
            throw new KeyAlreadyExistsError();
        }

        const ChaveGerada =  await keyGenerator();
        await this.UserRepository.createKeyPixById(id, ChaveGerada)

        return ChaveGerada;
    }
}

export { CreateKeyUseCase }