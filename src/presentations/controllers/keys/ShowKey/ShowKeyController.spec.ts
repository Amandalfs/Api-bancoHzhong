import { describe, it, expect, vi } from "vitest";
import { ShowKeyController } from "./ShowKeyController";
import { HttpRequest } from "../../../protocols/http";
import { DTORequestShowKeyUseCase, DTOResponseShowKeyUseCase, IShowKeyUseCase } from "../../../../module/keys/useCase/ShowKey/ShowKeyUseCase";

interface TypesSut {
    sut: ShowKeyController,
    useCase: IShowKeyUseCase,
}

const makeSut = ():TypesSut =>{
    const useCaseShowMock = new class CreateUserUseCase implements IShowKeyUseCase {
        execute(data: DTORequestShowKeyUseCase): Promise<DTOResponseShowKeyUseCase> {
            return new Promise(resolve => resolve(new DTOResponseShowKeyUseCase("Chave Aleatoria")))
        }
       
    }

    const sut = new ShowKeyController(useCaseShowMock);
    
    return {
        sut,
        useCase: useCaseShowMock,
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
