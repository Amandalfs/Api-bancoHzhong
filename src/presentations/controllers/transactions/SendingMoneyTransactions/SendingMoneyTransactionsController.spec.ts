import { describe, expect, it, vi } from "vitest";
import { HttpRequest } from "../../../protocols/http"
import { DTORequestSendingMoneyUseCase, DTOResponseSendingMoneyUseCase, ISendingMoneyUseCase } from "../../../../module/transactions/useCase/SendingMoney/SendingMoneyUseCase";
import { SendingMoneyTransactionsController } from "./SendingMoneyTransactionsController";

interface TypesSut {
    sut: SendingMoneyTransactionsController,
    useCase: ISendingMoneyUseCase,
}

const makeSut = ():TypesSut =>{
    const useCaseShowMock = new class sendingMoneyTransactionsUserUseCase implements ISendingMoneyUseCase {
        execute(data: DTORequestSendingMoneyUseCase): Promise<DTOResponseSendingMoneyUseCase> {

            const send = {
                    id_user: 1,
                    name: "Test 01",
                    tipo: "envio",
                    saldo: 50,
                    data: `00000`,
                    descricao: `Voce transferiu R$50`,
            }

            const receive = {
                    id_user: 2,
                    name: "Test 02",
                    tipo: "recebido",
                    saldo: 50,
                    data: `00000`,
                    descricao: `Voce recebeu R$50`,
            }
            
            return new Promise(resolve => resolve(
                new DTOResponseSendingMoneyUseCase(send, receive)
            ))
        }
       
    }

    const sut = new SendingMoneyTransactionsController(useCaseShowMock);
    
    return {
        sut,
        useCase: useCaseShowMock,
    }
}

describe("Testando o controllador de envio de dinheiro", ()=>{
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

    it("esperado que receba o controller consiga tratar erros 400",async ()=>{
        const { sut, useCase } = makeSut();
        vi.spyOn(useCase, "execute").mockRejectedValue({ statusCode: 400, message: "Bad Request"});
        const request: HttpRequest = {
            user: {
                id: 400,    
            },
            body: {
                keypix: "400",
                value: 400
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
            body: {
                keypix: "401",
                value: 401
            }
        }
        const response = await sut.handle(request);
        expect(response.statusCode).toEqual(401);
        expect(response.body.msg).toEqual("Unauthorized");
    })
})
