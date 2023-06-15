import { IUserRepository } from "../../../../repositories/implementations/IUserRepository";

import { sign } from "jsonwebtoken" 
import { PassordOrUsernameInvalidError } from "./errors";
import { Codificador } from "../../../../utils/Codificador/Codificador";
import { AuthConfigToken } from "../../../../config/auth";
import { GerenciadorDeToken } from "../../../../utils/GerenciadorDeToken/GerenciadorDeToken";

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

    constructor(
        private UserRepository: IUserRepository,
        private codificador: Codificador,
        private authConfig: AuthConfigToken,
        private gerenciadorDeToken: GerenciadorDeToken,
    ){}
    
    async execute({username, password}:DTORequestSessionsUseCase){

        const user = await this.UserRepository.findUserByUsername(username);

        if(!user){
            throw new PassordOrUsernameInvalidError();
        }

        const passwordPassed = await this.codificador.comparador(password, user.password);
        
        if(!passwordPassed){
            throw new PassordOrUsernameInvalidError();
        }

        const { secret, expiresIn } = this.authConfig.jwt;

        const token = this.gerenciadorDeToken.createToken({}, secret, {
            subject: String(user.id),
            expiresIn
        })

        return {token};
    }
}

export { SessionsUsersUseCase }