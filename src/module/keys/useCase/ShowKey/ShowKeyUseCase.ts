import { IUserRepository } from "../../../../repositories/implementations/IUserRepository";

import {AppError} from '../../../../utils/AppError';

class ShowKeyUseCase{
    constructor(private UserRepository: IUserRepository){}

    async execute(id:number){
        const user = await this.UserRepository.findUserById(id);

        if(!user.keypix){
            throw new AppError("Chave pix nao existe");
        }

        return user.keypix;
    }
}

export { ShowKeyUseCase };