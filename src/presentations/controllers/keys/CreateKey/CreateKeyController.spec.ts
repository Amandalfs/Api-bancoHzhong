import { describe, it, expect, vi } from "vitest";
import { CreateKeyController } from "./CreateKeyController";
import { HttpRequest } from "../../../protocols/http";
import { DTORequestCreatekeyUseCase, DTOResponseCreatekeyUseCase, ICreatekeyUseCase } from "../../../../module/keys/useCase/CreateKey/CreateKeyUseCase";

interface TypesSut {
    sut: CreateKeyController,
    useCase: ICreatekeyUseCase,
}

const makeSut = ():TypesSut =>{
    const useCaseCreateMock = new class CreateUseCase implements ICreatekeyUseCase {
        execute(data: DTORequestCreatekeyUseCase): Promise<DTOResponseCreatekeyUseCase> {
            return new Promise(resolve => resolve(new DTOResponseCreatekeyUseCase("Chave Aleatoria")))
        }
       
    }

    const sut = new CreateKeyController(useCaseCreateMock);
    
    return {
        sut,
        useCase: useCaseCreateMock,
    }
}

describe("Testando o controllador de mosntrar chave pix", ()=>{

    it("esperado que receba o controller consiga tratar erros desconhecido",async ()=>{
        const { sut, useCase } = makeSut();
        vi.spyOn(useCase, "execute").mockRejectedValue(new Error);
        const request: HttpRequest = {
            user: {
                id: 500,    
            }
        }
        const response = await sut.handle(request);
        expect(response.statusCode).toEqual(500);
        expect(response.body.msg).toEqual("Server Internal Error");
    })



})
