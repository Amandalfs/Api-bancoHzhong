const { hash } = require('bcrypt');
const AppError = require('../../../../utils/AppError');
const verifyAge = require('../../../../utils/verify/verifyAge');

class CreateUserUseCase {
    UserRepository;
    constructor(UserRepository){
        this.UserRepository = UserRepository;
    }

    async execute({username, name, nasc, typeaccont, email,  password, cpf}){

        if(verifyAge(nasc)){
            throw new AppError("Usuario e menor de idade", 401);
        }
        

        const passwordCriptografada = await hash(password, 10);

        const infosDefault = {
            numero: 153,
            agencia: "003",
            saldo: 0            
        }

        const userNew = {
            ...infosDefault,
            username: username,
            name: name,
            nasc: nasc, 
            typeaccont: typeaccont,
            email: email,
            password: passwordCriptografada,
            cpf: cpf,
        }

        await this.UserRepository.createUser(userNew);

    }
}

module.exports = CreateUserUseCase;