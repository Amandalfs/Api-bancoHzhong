const { hash } = require('bcrypt');
const AppError = require('../../../../utils/AppError');
const verifyAge = require('../../../../utils/verify/verifyAge');
const validarCPF = require('../../../../utils/validarCpf');

class CreateUserUseCase {
    UserRepository;
    constructor(UserRepository){
        this.UserRepository = UserRepository;
    }

    async execute({username, name, nasc, typeaccont, email,  password, password2, cpf}){

        if(verifyAge(nasc)){
            throw new AppError("Usuario e menor de idade", 401);
        }

        validarCPF(cpf);

        const isEmail = await this.UserRepository.findUserByEmail(email);
        const isUsername = await this.UserRepository.findUserByUsername(username);
        const isCpf = await this.UserRepository.findUserByCPF(cpf);
    
        if(!isEmail){
            throw new AppError("Ja existente uma conta com esse Email");
        }
    
        if(!isUsername){
            throw new AppError("Ja existente uma conta com esse CPF");
        }
    
        if(!isCpf){
            throw new AppError("Ja existente uma conta com esse Username");
        }

        if(password !== password2){
            throw new AppError("Senhas Diferentes");
        }

        const passwordCriptografada = await hash(password, 10);

        const newUser = {
            numero: 153,
            agencia: "003",
            saldo: 0, 
            username: username,
            name: name,
            nasc: nasc, 
            typeaccont: typeaccont,
            email: email,
            password: passwordCriptografada,
            cpf: cpf,
        }

        await this.UserRepository.createUser(newUser);

    }
}

module.exports = CreateUserUseCase;