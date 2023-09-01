import { IUserRepository } from "../SessionsUsers/protocols"
import { ResourceNotFoundError } from "../ShowUser/errors";
import { Codificador } from './../../../../../utils/Codificador/Codificador';

export interface inputModifyUserDTO {
    id:  number,
    userUpdate: {
        username?: string,
        name?: string, 
        email?: string,
        password?: string
        oldPassword?: string
    }
}

export interface outputModifyUserDTO {
    username: string,
    name: string,
    email: string, 
}

export class ModifyUserUseCase {
    
    constructor(private userRepository: IUserRepository, private codificador: Codificador){}

    async execute({ id, userUpdate: { email, name, oldPassword, password, username} }: inputModifyUserDTO): Promise<outputModifyUserDTO>{

        let user = await this.userRepository.findUserById(id);

        if(!user){
            throw new ResourceNotFoundError();
        }

        user.name = name ?? user.name;

        if(email){
            const emailExists = await this.userRepository.findUserByEmail(email);
            if(!emailExists){
                user.email =  email ?? user.email;
            }
        }

        if(username){
            const usernameExists = await this.userRepository.findUserByUsername(username)
            if(!usernameExists){
                user.username =  username ?? user.username;
            }
        }

        if(oldPassword){
            const passwordPassed = await this.codificador.comparador(oldPassword, user.password);
            if(passwordPassed){
                const newPassword = await this.codificador.criptografia(password, 10);
                user.password = newPassword;
            }
        }

        user = await this.userRepository.updateAccont(id, user);

        return {
            email: user.email,
            name: user.name,
            username: user.username,
        }
    }
}