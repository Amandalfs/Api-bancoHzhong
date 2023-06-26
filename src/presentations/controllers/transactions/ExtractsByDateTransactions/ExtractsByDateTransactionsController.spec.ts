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
            query: {
                dateStart: "500",
                dateEnd: "500"
            }
        }
        const response = await sut.handle(request);
        expect(response.statusCode).toEqual(500);
        expect(response.body.msg).toEqual("Server Internal Error");
    })

    it("esperado que receba o controller consiga tratar erros 400",async ()=>{
        const { sut, useCase } = makeSut();
        vi.spyOn(useCase, "execute").mockRejectedValue({ statusCode: 400, message: "Bad Request"});
        const request: HttpRequest = {
            user: {
                id: 400,    
            },
            query: {
                dateStart: "400",
                dateEnd: "400"
            }
        }
        const response = await sut.handle(request);
        expect(response.statusCode).toEqual(400);
        expect(response.body.msg).toEqual("Bad Request");
    })

    it("esperado que receba o controller consiga tratar erros 401",async ()=>{
        const { sut, useCase } = makeSut();
        vi.spyOn(useCase, "execute").mockRejectedValue({ statusCode: 401, message: "Unauthorized"});
        const request: HttpRequest = {
            user: {
                id: 401,    
            },
            query: {
                dateStart: "401",
                dateEnd: "401"
            }
        }
        const response = await sut.handle(request);
        expect(response.statusCode).toEqual(401);
        expect(response.body.msg).toEqual("Unauthorized");
    })

    it("esperado que receba o controller consiga tratar erros 404",async ()=>{
        const { sut, useCase } = makeSut();
        vi.spyOn(useCase, "execute").mockRejectedValue({ statusCode: 404, message: "Not Found"});
        const request: HttpRequest = {
            user: {
                id: 404,    
            },
            query: {
                dateStart: "404",
                dateEnd: "404"
            }
        }
        const response = await sut.handle(request);
        expect(response.statusCode).toEqual(404);
        expect(response.body.msg).toEqual("Not Found");
    })
})
