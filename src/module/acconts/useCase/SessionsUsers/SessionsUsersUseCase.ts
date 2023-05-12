import { IUserRepository } from "../../../../repositories/implementations/IUserRepository";

import { compare } from 'bcrypt';
import authConfig from "../../../../config/auth"
import { sign } from "jsonwebtoken" 
import { AppError } from "../../../../utils/AppError"; 


class SessionsUsersUseCase{

    constructor(private UserRepository: IUserRepository){}
    
    async execute(username:string, password:string): Promise<string>{

        const user = await this.UserRepository.findUserByUsername(username);

        if(!user){
            throw new AppError("Senha Ou Username digitada esta errada", 401);
        }

        const passwordPassed = await compare(password, user.password);
        
        if(!passwordPassed){
            throw new AppError("Senha Ou Username digitada esta errada", 401);
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn
        })

        return token;
    }
}

export { SessionsUsersUseCase }