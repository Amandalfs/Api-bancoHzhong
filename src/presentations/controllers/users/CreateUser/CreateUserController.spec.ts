import { describe, it, expect, vi } from "vitest";
import { HttpRequest } from './../../../protocols/http'
import { CreateUserController } from "./CreateUserController";
import { ICreateUserRequestDTO, ICreateUserResponseDTO, ICreateUserUseCase } from "../../../../module/acconts/useCase/CreateUser/CreateUserUseCase";

interface TypesSut {
    sut: CreateUserController,
    useCase: ICreateUserUseCase,
}

const makeSut = ():TypesSut =>{
    const useCaseCreateUsersMock = new class CreateUserUseCase implements ICreateUserUseCase {
        execute(data: ICreateUserRequestDTO): Promise<ICreateUserResponseDTO> {
            return new Promise(resolve => resolve({user: "created"}));
        }
    }

    const sut = new CreateUserController(useCaseCreateUsersMock);
    
    return {
        sut,
        useCase: useCaseCreateUsersMock,
    }
}

describe("Testando o controllador de criacao de conta", ()=>{

    it("esperado que receba o controller consiga tratar erros desconhecido",async ()=>{
        const { sut, useCase } = makeSut();
        vi.spyOn(useCase, "execute").mockRejectedValue(new Error);
        const request: HttpRequest = {
            body: {
                username: "Error500",
                name: "Error500Name", 
                nasc: "500", 
                typeaccont: "500", 
                email: "500"
            },
            headers: {
                password: "500",
                password2: "500", 
                cpf: "500"
            }
        }
        const response = await sut.handle(request);
        expect(response.statusCode).toEqual(500);
        expect(response.body.msg).toEqual("Server Internal Error");
    })

    it("esperado que receba o controller consiga tratar erros de 400",async ()=>{
        const { sut, useCase } = makeSut();
        vi.spyOn(useCase, "execute").mockRejectedValue({statusCode: 400, message: "Bad Request"});

        const request: HttpRequest = {
            body: {
                username: "Error400",
                name: "Error400Name", 
                nasc: "400", 
                typeaccont: "400", 
                email: "400"
            },
            headers: {
                password: "400",
                password2: "400", 
                cpf: "400"
            }
        }
        const response = await sut.handle(request);
        expect(response.statusCode).toEqual(400);
        expect(response.body.msg).toEqual("Bad Request");
    })

    it("esperado que receba o controller consiga tratar erros de 401",async ()=>{
        const { sut, useCase } = makeSut();
        vi.spyOn(useCase, "execute").mockRejectedValue({statusCode: 401, message: "Unauthorized"});

        const request: HttpRequest = {
            body: {
                username: "Error400",
                name: "Error400Name", 
                nasc: "400", 
                typeaccont: "400", 
                email: "400"
            },
            headers: {
                password: "400",
                password2: "400", 
                cpf: "400"
            }
        }
        const response = await sut.handle(request);
        expect(response.statusCode).toEqual(401);
        expect(response.body.msg).toEqual("Unauthorized");
    })

    it("esperado que receba o controller mande os dados corretos para o useCase",async ()=>{
        const { sut, useCase } = makeSut();
        const useCaseSpy = vi.spyOn(useCase, "execute");
        const request: HttpRequest = {
            body: {
                username: "Error400",
                name: "Error400Name", 
                nasc: "400", 
                typeaccont: "400", 
                email: "400"
            },
            headers: {
                password: "400",
                password2: "400", 
                cpf: "400"
            }
        }
        await sut.handle(request);
        expect(useCaseSpy.mock.calls[0][0]).toEqual({
            username: 'Error400',
            name: 'Error400Name',
            nasc: '400',
            typeaccont: '400',
            email: '400',
            password: '400',
            password2: '400',
            cpf: '400'
          })
    })

    it("esperado que receba o controller mande status 201 de create",async ()=>{
        const { sut } = makeSut();
        const request: HttpRequest = {
            body: {
                username: "Error400",
                name: "Error400Name", 
                nasc: "400", 
                typeaccont: "400", 
                email: "400"
            },
            headers: {
                password: "400",
                password2: "400", 
                cpf: "400"
            }
        }
        const {statusCode, body} = await sut.handle(request);
        expect(statusCode).toEqual(201);
        expect(body).toEqual(expect.any(Object));
        expect(body.msg).toEqual("created")
    })

    it("esperado que o controlador retorne erro para username nao enviado",async ()=>{
        const { sut } = makeSut();
        const request: HttpRequest = {
            body: {
                username: "",
                name: "ErrorUsername", 
                nasc: "ErrorUsername", 
                typeaccont: "ErrorUsername", 
                email: "ErrorUsername"
            },
            headers: {
                password: "ErrorUsername",
                password2: "ErrorUsername", 
                cpf: "ErrorUsername"
            }
        }
        const {statusCode, body} = await sut.handle(request);
        expect(statusCode).toEqual(400);
        expect(body.msg).toEqual("Invalid param:Username")
    })

    it("esperado que o controlador retorne erro para name nao enviado",async ()=>{
        const { sut } = makeSut();
        const request: HttpRequest = {
            body: {
                username: "ErrorName",
                name: "", 
                nasc: "ErrorName", 
                typeaccont: "ErrorName", 
                email: "ErrorName"
            },
            headers: {
                password: "ErrorName",
                password2: "ErrorName", 
                cpf: "ErrorName"
            }
        }
        const {statusCode, body} = await sut.handle(request);
        expect(statusCode).toEqual(400);
        expect(body.msg).toEqual("Invalid param:Name")
    })

    it("esperado que o controlador retorne erro para nascimento nao enviado",async ()=>{
        const { sut } = makeSut();
        const request: HttpRequest = {
            body: {
                username: "ErrorNasc",
                name: "ErrorNasc", 
                nasc: "", 
                typeaccont: "ErrorNasc", 
                email: "ErrorNasc"
            },
            headers: {
                password: "ErrorNasc",
                password2: "ErrorNasc", 
                cpf: "ErrorNasc"
            }
        }
        const {statusCode, body} = await sut.handle(request);
        expect(statusCode).toEqual(400);
        expect(body.msg).toEqual("Invalid param:Nasc")
    })


})
