import { IUserRepository } from "../../../../repositories/implementations/IUserRepository";
import { IUser } from "../../../../repositories/modal/IUser";

import { hash } from "bcrypt";
import { IVerifyAge } from "../../../../utils/verify/verifyAge";
import { IValidarCpf } from "../../../../utils/verify/validarCpf";

import { AccontExistsError, ConfirmationPasswordInvalidError, UserUnder18YearsOldError } from "./errors";
import { AppError } from "../../../../utils/AppError";

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
    constructor(private UserRepository:IUserRepository, 
        private verifyAge: IVerifyAge, 
        private validarCpf: IValidarCpf ){}

    async execute({username, name, nasc, typeaccont, email,  password, password2, cpf}: ICreateUserRequestDTO){

        if(this.verifyAge.execute(nasc)){
            throw new UserUnder18YearsOldError();
        }

        if(this.validarCpf.execute(cpf)){
            throw new AppError("cpf invalido");
        }

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