import { CreateUserController } from "../../../../presentations/controllers/users/CreateUser/CreateUserController";
import { CreateUserUseCase } from "../../../../domain/module/acconts/useCase/CreateUser/CreateUserUseCase";
import { UserRepository } from "../../../../entities/repositories/knexRepositories/UserRepository";
import { verifyAge } from "../../../../utils/verify/verifyAge";
import { ValidarCpf } from "../../../../utils/verify/validarCpf";
import { CodificadorAdapterCrypto } from "../../../../utils/Codificador/CodificadorAdapterCrypto";

export function makeCreateUserController():CreateUserController{
    const usersRepository = new UserRepository;
    const VerifyAge = new verifyAge;
    const validatyCpf = new ValidarCpf;
    const codificador = new CodificadorAdapterCrypto;
    const createUserUseCase = new CreateUserUseCase(usersRepository, VerifyAge, validatyCpf, codificador);
    return new CreateUserController(createUserUseCase);
}