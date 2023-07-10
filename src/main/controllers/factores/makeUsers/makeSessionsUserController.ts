import { AuthConfig } from "../../../../config/auth";
import { SessionsUsersUseCase } from "../../../../domain/module/acconts/useCase/SessionsUsers/SessionsUsersUseCase";
import { UserRepository } from "../../../../entities/repositories/knexRepositories/UserRepository";
import { SessionsUserController } from "../../../../presentations/controllers/users/SessionsUser/SessionsUserController";
import { CodificadorAdapterCrypto } from "../../../../utils/Codificador/CodificadorAdapterCrypto";
import { GerenciadorDeTokenAdaptarJsonWebToken } from "../../../../utils/GerenciadorDeToken/GerenciadorDeTokenAdaptarJsonWebToken";


export function makeSessionsUserController(){
    const usersRepository = new UserRepository();
    const encoder = new CodificadorAdapterCrypto();
    const tokenManager = new GerenciadorDeTokenAdaptarJsonWebToken();
    const sessionsUserUseCase = new SessionsUsersUseCase(usersRepository, encoder, AuthConfig, tokenManager);
    const controller = new SessionsUserController(sessionsUserUseCase);
    return controller;
}