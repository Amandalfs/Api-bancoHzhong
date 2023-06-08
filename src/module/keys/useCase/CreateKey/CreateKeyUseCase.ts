import { IUserRepository } from "../../../../repositories/implementations/IUserRepository";

import {keyGenerator} from "../../../../utils/keyGenerator";
import {AppError} from '../../../../utils/AppError';
import { ResourceNotFoundError } from "../../../../utils/errors/ResourceNotFoundError";

class CreateKeyUseCase{

    constructor(private UserRepository: IUserRepository){}

    async execute(id:number){
        const user = await this.UserRepository.findUserById(id);

        if(!user){
            throw new ResourceNotFoundError();
        }

        if(user.keypix){
            throw new AppError("Chave pix Ja existe")
        }

        const ChaveGerada =  await keyGenerator();
        await this.UserRepository.createKeyPixById(id, ChaveGerada)

        return ChaveGerada;
    }
}

export { CreateKeyUseCase }