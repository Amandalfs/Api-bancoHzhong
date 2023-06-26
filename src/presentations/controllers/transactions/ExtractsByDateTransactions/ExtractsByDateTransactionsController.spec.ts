import { describe, expect, it, vi } from "vitest"
import { HttpRequest } from "../../../protocols/http";
import { DTORequestExtractsByDateUseCase, DTOResponseExtractsByDateUseCase, IExtractsByDateUseCase } from "../../../../module/transactions/useCase/ExtractsByData/ExtractsByDataUseCase";
import { ExtractsByDateTransactionsController } from "./ExtractsByDateTransactionsController";

interface TypesSut {
    sut: ExtractsByDateTransactionsController,
    useCase: IExtractsByDateUseCase,
}

const makeSut = ():TypesSut =>{
    const useCaseShowMock = new class sendingMoneyTransactionsUserUseCase implements IExtractsByDateUseCase {
        execute(data: DTORequestExtractsByDateUseCase): Promise<DTOResponseExtractsByDateUseCase> {
            return new Promise(resolve => resolve(
                new DTOResponseExtractsByDateUseCase([{
                    tipo: "envio",
                    saldo: 50,
                    data: '0000',
                    descricao: "test",
                }])
            ))
        }
       
    }

    const sut = new ExtractsByDateTransactionsController(useCaseShowMock);
    
    return {
        sut,
        useCase: useCaseShowMock,
    }
}

describe("Testando o controllador de extratos", ()=>{
    it("esperado que receba o controller consiga tratar erros desconhecido",async ()=>{
        const { sut, useCase } = makeSut();
        vi.spyOn(useCase, "execute").mockRejectedValue(new Error);
        const request: HttpRequest = {
            user: {
                id: 500,    
            },
            body: {
                keypix: "500",
                value: 500
            }
        }
        const response = await sut.handle(request);
        expect(response.statusCode).toEqual(500);
        expect(response.body.msg).toEqual("Server Internal Error");
    })
})
