import { CreateKeyController } from "../../../../presentations/controllers/keys/CreateKey/CreateKeyController";
import { CreateKeyUseCase } from "../../../../domain/module/keys/useCase/CreateKey/CreateKeyUseCase";
import { UserRepository } from "../../../../entities/repositories/knexRepositories/UserRepository";
import { KeyGeneratorAdapterCrypto } from "../../../../utils/keyGenerator";

export function makeCreateKeyController(){
    const userRepositoy = new UserRepository;
    const keyGenerator = new KeyGeneratorAdapterCrypto();
    const createKeyUseCase = new CreateKeyUseCase(userRepositoy, keyGenerator);
    const controller = new CreateKeyController(createKeyUseCase);
    return controller;
}