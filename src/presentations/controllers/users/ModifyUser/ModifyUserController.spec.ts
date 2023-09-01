import { describe, it, expect, vi } from "vitest";
import { HttpRequest } from './../../../protocols/http'
import { IModifyUserUseCase, inputModifyUserDTO, outputModifyUserDTO } from "../../../../domain/module/acconts/useCase/ModifyUser/ModifyUserUseCase";
import { ModifyUserController } from "./ModifyUserController";

interface TypesSut {
    sut: ModifyUserController,
    useCase: IModifyUserUseCase,
}

const makeSut = ():TypesSut =>{
    const useCaseModifyUseCaseMock = new class ModifyUseCase implements IModifyUserUseCase {
        async execute(input: inputModifyUserDTO): Promise<outputModifyUserDTO> {
            return new Promise(resolve => resolve({
                email: "test",
                name: "test",
                username: "test",
            }));
        }
    }

    const sut = new ModifyUserController(useCaseModifyUseCaseMock);
    
    return {
        sut,
        useCase: useCaseModifyUseCaseMock,
    }
}

describe("Modify user controller tests units", ()=>{
    it("should throw a 500 server error status", async ()=>{
        const { sut, useCase } = makeSut();
        vi.spyOn(useCase, "execute").mockRejectedValue(new Error);
        const request: HttpRequest = {
            body: {
                username: "Error500",
                name: "Error500Name", 
                email: "Error500Email"
            }
        }
        const response = await sut.handle(request);
        expect(response.statusCode).toEqual(500);
        expect(response.body.msg).toEqual("Server Internal Error");
    })

    it("should throw a 400 bad request error status", async ()=>{
        const { sut, useCase } = makeSut();
        vi.spyOn(useCase, "execute").mockRejectedValue({
            statusCode: 400,
            message: "Bad Request"
        });
        const request: HttpRequest = {
            body: {
                username: "Error400",
                name: "Error400Name", 
                email: "Error400Email"
            },
            user: {
                id: 1
            }
        }
        const response = await sut.handle(request);
        expect(response.statusCode).toEqual(400);
        expect(response.body.msg).toEqual("Bad Request");
    })

    it("should throw a 401 unauthorized error status", async ()=>{
        const { sut, useCase } = makeSut();
        vi.spyOn(useCase, "execute").mockRejectedValue({
            statusCode: 401,
            message: "Unauthorized"
        });
        const request: HttpRequest = {
            body: {
                username: "Error400",
                name: "Error400Name", 
                email: "Error400Email"
            },
            user: {
                id: 1
            }
        }
        const response = await sut.handle(request);
        expect(response.statusCode).toEqual(401);
        expect(response.body.msg).toEqual("Unauthorized");
    })
})
