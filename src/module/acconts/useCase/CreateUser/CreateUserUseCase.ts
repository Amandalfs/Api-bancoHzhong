import { IUserRepository } from "../../../../repositories/implementations/IUserRepository";
import { IUser } from "../../../../repositories/modal/IUser";

import { hash } from "bcrypt";
import { AppError } from "../../../../utils/AppError"; 
import { verifyAge } from "../../../../utils/verify/verifyAge";
import { validarCPF } from "../../../../utils/validarCpf";
import { AccontExistsError } from "./errors/AccontExistsError";
import { ConfirmationPasswordInvalidError } from "./errors/ConfirmationPasswordInvalidError";

interface ICreateUserRequestDTO {
    username: string, 
    name: string, 
    nasc: string, 
    typeaccont: string, 
    email: string,  
    password: string, 
    password2: string, 
    cpf: string
}

interface ICreateUserResponseDTO {
    user: string,
}

interface ICreateUserUseCase {
    execute(data: ICreateUserRequestDTO): Promise<ICreateUserResponseDTO>
}

class CreateUserUseCase implements ICreateUserUseCase {
    constructor(private UserRepository:IUserRepository){}

    async execute({username, name, nasc, typeaccont, email,  password, password2, cpf}: ICreateUserRequestDTO){

        if(verifyAge(nasc)){
            throw new AppError("Usuario e menor de idade", 401);
        }

        validarCPF(cpf);

        const isEmail = await this.UserRepository.findUserByEmail(email);
        const isUsername = await this.UserRepository.findUserByUsername(username);
        const isCpf = await this.UserRepository.findUserByCPF(cpf);

        if(isEmail){
            throw new AccontExistsError("Email");
        }
    
        if(isUsername){
            throw new AccontExistsError("Username");
        }
    
        if(isCpf){
            throw new AccontExistsError("Cpf");
        }

        if(password !== password2){
            throw new ConfirmationPasswordInvalidError();
        }

        const passwordCriptografada = await hash(password, 10);

        const newUser:IUser = {
            numero: 153,
            agencia: "003",
            saldo: 0, 
            username,
            name,
            nasc, 
            typeaccont,
            email,
            password: passwordCriptografada,
            cpf,
        }

        await this.UserRepository.createUser(newUser);

        return {
            user: "created"
        }
    }
}

export {CreateUserUseCase, ICreateUserUseCase};