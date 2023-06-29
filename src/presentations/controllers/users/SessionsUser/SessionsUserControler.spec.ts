import { describe, it, expect, vi } from "vitest";
import { HttpRequest } from './../../../protocols/http'
import { SessionsUserController } from "./SessionsUserController";
import { DTORequestSessionsUseCase, DTOResponseSessionsUseCase, ISessionsUsersUseCase } from "../../../../domain/module/acconts/useCase/SessionsUsers/SessionsUsersUseCase";

interface TypesSut {
    sut: SessionsUserController,
    useCase: ISessionsUsersUseCase,
}

const makeSut = ():TypesSut =>{
    const useCaseSessionsMock = new class CreateUserUseCase implements ISessionsUsersUseCase {
        execute(data: DTORequestSessionsUseCase): Promise<DTOResponseSessionsUseCase> {
            return new Promise(resolve => resolve({token: "TokenValidoGerado"}))
        }
        
    }

    const sut = new SessionsUserController(useCaseSessionsMock);
    
    return {
        sut,
        useCase: useCaseSessionsMock,
    }
}

describe("Testando o controllador de criar sessao", ()=>{

    it("esperado que receba o controller consiga tratar erros desconhecido",async ()=>{
        const { sut, useCase } = makeSut();
        vi.spyOn(useCase, "execute").mockRejectedValue(new Error);
        const request: HttpRequest = {
            body: {
                username: "Error500",
                password: "Error500", 
            }
        }
        const response = await sut.handle(request);
        expect(response.statusCode).toEqual(500);
        expect(response.body.msg).toEqual("Server Internal Error");
    })

    it("esperado que receba o controller consiga tratar erros 400",async ()=>{
        const { sut, useCase } = makeSut();
        vi.spyOn(useCase, "execute").mockRejectedValue({statusCode: 400, message:"Bad Request"});
        const request: HttpRequest = {
            body: {
                username: "Error400",
                password: "Error400", 
            }
        }
        const response = await sut.handle(request);
        expect(response.statusCode).toEqual(400);
        expect(response.body.msg).toEqual("Bad Request");
    })

    it("esperado que receba o controller consiga tratar erros 401",async ()=>{
        const { sut, useCase } = makeSut();
        vi.spyOn(useCase, "execute").mockRejectedValue({statusCode: 401, message:"Unauthorized"});
        const request: HttpRequest = {
            body: {
                username: "Error401",
                password: "Error401", 
            }
        }
        const response = await sut.handle(request);
        expect(response.statusCode).toEqual(401);
        expect(response.body.msg).toEqual("Unauthorized");
    })

    it("esperado que o controlador envie um erro quando nao envia o username",async ()=>{
        const { sut } = makeSut();
        const request: HttpRequest = {
            body: {
                username: "",
                password: "UsernameError", 
            }
        }
        const response = await sut.handle(request);
        expect(response.statusCode).toEqual(400);
        expect(response.body.msg).toEqual("Invalid param:Username");
    })

    it("esperado que o controlador envie um erro quando nao envia o password",async ()=>{
        const { sut } = makeSut();
        const request: HttpRequest = {
            body: {
                username: "PasswordError",
                password: "", 
            }
        }
        const response = await sut.handle(request);
        expect(response.statusCode).toEqual(400);
        expect(response.body.msg).toEqual("Invalid param:Password");
    })
 
    it("esperado que o controlador envie os dados corretos para o useCase",async ()=>{
        const { sut, useCase } = makeSut();
        const useCaseSpy = vi.spyOn(useCase, "execute").mock.calls
        const request: HttpRequest = {
            body: {
                username: "ValidUsername",
                password: "ValidPassword", 
            }
        }
        await sut.handle(request);
        expect(useCaseSpy[0][0]).toEqual({
            username: "ValidUsername",
            password: "ValidPassword", 
        })
    })

    it("esperado que o controlador enviar a resposta de sucesso com o token",async ()=>{
        const { sut } = makeSut();
        const request: HttpRequest = {
            body: {
                username: "ValidUsername",
                password: "ValidPassword", 
            }
        }
        const { body} = await sut.handle(request);
        expect(body.params.token).toEqual("TokenValidoGerado");
    })

})
