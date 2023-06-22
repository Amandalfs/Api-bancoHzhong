import { describe, it, expect, vi } from "vitest";
import { HttpRequest } from "../../../protocols/http";
import { DTORequestWithdrawTransctionsUseCase, DTOResponseWithdrawTransctionsUseCase, IWithdrawTransctionsUseCase } from "../../../../module/transactions/useCase/WithdrawTransactions/WithdrawTransactionsUseCase";
import { WithdrawTransactionsController } from "./WithdrawTransactionsController";

interface TypesSut {
    sut: WithdrawTransactionsController,
    useCase: IWithdrawTransctionsUseCase,
}

const makeSut = ():TypesSut =>{
    const useCaseShowMock = new class withdrawTransactionsUserUseCase implements IWithdrawTransctionsUseCase {
        execute(data: DTORequestWithdrawTransctionsUseCase): Promise<DTOResponseWithdrawTransctionsUseCase> {
            return new Promise(resolve => resolve(new DTOResponseWithdrawTransctionsUseCase({
                data:  "00000",
                descricao: "testes",
                id_user: 1,
                name: "testes",
                saldo: 50,
                tipo: "teste",
            })))
        }
       
    }

    const sut = new WithdrawTransactionsController(useCaseShowMock);
    
    return {
        sut,
        useCase: useCaseShowMock,
    }
}

describe("Testando o controllador de saque", ()=>{

    it("esperado que receba o controller consiga tratar erros desconhecido",async ()=>{
        const { sut, useCase } = makeSut();
        vi.spyOn(useCase, "execute").mockRejectedValue(new Error);
        const request: HttpRequest = {
            user: {
                id: 500,    
            },
            body: {
                withdraw: 500
            }
        }
        const response = await sut.handle(request);
        expect(response.statusCode).toEqual(500);
        expect(response.body.msg).toEqual("Server Internal Error");
    })

    it("esperado que receba o controller consiga tratar erros 400",async ()=>{
        const { sut, useCase } = makeSut();
        vi.spyOn(useCase, "execute").mockRejectedValue({statusCode: 400, message: "Bad Request"});
        const request: HttpRequest = {
            user: {
                id: 400,    
            },
            body: {
                withdraw: 400
            }
        }
        const response = await sut.handle(request);
        expect(response.statusCode).toEqual(400);
        expect(response.body.msg).toEqual("Bad Request");
    })

    it("esperado que receba o controller consiga tratar erros 401",async ()=>{
        const { sut, useCase } = makeSut();
        vi.spyOn(useCase, "execute").mockRejectedValue({statusCode: 401, message: "Unauthorized"});
        const request: HttpRequest = {
            user: {
                id: 400,    
            },
            body: {
                withdraw: 400
            }
        }
        const response = await sut.handle(request);
        expect(response.statusCode).toEqual(401);
        expect(response.body.msg).toEqual("Unauthorized");
    })

    
    it("esperado que receba o controller consiga tratar erros 404",async ()=>{
        const { sut, useCase } = makeSut();
        vi.spyOn(useCase, "execute").mockRejectedValue({statusCode: 404, message: "Not Found"});
        const request: HttpRequest = {
            user: {
                id: 404,    
            },
            body: {
                withdraw: 404
            }
        }
        const response = await sut.handle(request);
        expect(response.statusCode).toEqual(404);
        expect(response.body.msg).toEqual("Not Found");
    })


})
