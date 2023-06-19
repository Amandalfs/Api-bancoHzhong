import { describe, it, expect, vi } from "vitest";
import { HttpRequest } from './../../../protocols/http'
import { SessionsUserController } from "./SessionsUserController";
import { DTORequestSessionsUseCase, DTOResponseSessionsUseCase, ISessionsUsersUseCase } from "../../../../module/acconts/useCase/SessionsUsers/SessionsUsersUseCase";

interface TypesSut {
    sut: SessionsUserController,
    useCase: ISessionsUsersUseCase,
}

const makeSut = ():TypesSut =>{
    const useCaseSessionsMock = new class CreateUserUseCase implements ISessionsUsersUseCase {
        execute(data: DTORequestSessionsUseCase): Promise<DTOResponseSessionsUseCase> {
            return new Promise(resolve => resolve({token: "jdibgvjgodfsbovudibospbpis"}))
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

 

})
