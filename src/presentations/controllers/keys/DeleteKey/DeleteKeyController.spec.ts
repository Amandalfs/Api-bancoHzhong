import { describe, it, expect, vi } from "vitest";
import { DeleteKeyController } from "./DeleteKeyController";
import { HttpRequest } from "../../../protocols/http";
import { DTORequestDeleteKeyUseCase, DTOResponseDeleteKeyUseCase, IDeleteKeyUseCase } from "../../../../domain/module/keys/useCase/DeleteKey/DeleteKeyUseCase";

interface TypesSut {
    sut: DeleteKeyController,
    useCase: IDeleteKeyUseCase,
}

const makeSut = ():TypesSut =>{
    const useCaseDeleteMock = new class DeleteUseCase implements IDeleteKeyUseCase {
        execute(data: DTORequestDeleteKeyUseCase): Promise<DTOResponseDeleteKeyUseCase> {
            return new Promise(resolve => resolve(new DTOResponseDeleteKeyUseCase("Chave deletada com sucesso")))
        }
       
    }

    const sut = new DeleteKeyController(useCaseDeleteMock);
    
    return {
        sut,
        useCase: useCaseDeleteMock,
    }
}

describe("Testando o controlador de deleta chave", ()=>{

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
