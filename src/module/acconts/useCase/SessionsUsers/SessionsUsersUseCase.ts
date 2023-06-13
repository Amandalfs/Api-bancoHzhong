import { IUserRepository } from "../../../../repositories/implementations/IUserRepository";

import { compare } from 'bcrypt';
import authConfig from "../../../../config/auth"
import { sign } from "jsonwebtoken" 
import { PassordOrUsernameInvalidError } from "./errors/PassordOrUsernameInvalidError";

export interface DTORequestSessionsUseCase {
    username: string
    password: string
}

export interface DTOResponseSessionsUseCase {
    token: string
}

export interface ISessionsUsersUseCase {
    execute(data: DTORequestSessionsUseCase): Promise<DTOResponseSessionsUseCase>
}


class SessionsUsersUseCase implements ISessionsUsersUseCase{

    constructor(private UserRepository: IUserRepository){}
    
    async execute({username, password}:DTORequestSessionsUseCase){

        const user = await this.UserRepository.findUserByUsername(username);

        if(!user){
            throw new PassordOrUsernameInvalidError();
        }

        const passwordPassed = await compare(password, user.password);
        
        if(!passwordPassed){
            throw new PassordOrUsernameInvalidError();
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