import { describe, it, expect, vi } from "vitest";
import { DepositTransactionsController } from "./DepositTransactionsController";
import { DTORequestDepositTransactionsUseCase, DTOResponseDepositTransactionsUseCase, IDepositTransactionsUseCase } from "../../../../domain/module/transactions/useCase/DepositTransactions/DepositTransactionsUseCase";
import { HttpRequest } from "../../../protocols/http";

interface TypesSut {
    sut: DepositTransactionsController,
    useCase: IDepositTransactionsUseCase,
}

const makeSut = ():TypesSut =>{
    const useCaseShowMock = new class CreateUserUseCase implements IDepositTransactionsUseCase {
        execute(data: DTORequestDepositTransactionsUseCase): Promise<DTOResponseDepositTransactionsUseCase> {
            return new Promise(resolve => resolve(new DTOResponseDepositTransactionsUseCase({
                id_user: 1,
                name: "TEST",
                tipo: "Test",
                saldo: 50,
                data: new Date(2020,1,1,1,1,1,1),
                descricao: "Test",
            })))
        }
       
    }

    const sut = new DepositTransactionsController(useCaseShowMock);
    
    return {
        sut,
        useCase: useCaseShowMock,
    }
}

describe("Testando o controllador de Deposito", ()=>{

    it("esperado que receba o controller consiga tratar erros desconhecido",async ()=>{
        const { sut, useCase } = makeSut();
        vi.spyOn(useCase, "execute").mockRejectedValue(new Error);
        const request: HttpRequest = {
            user: {
                id: 500,    
            },
            body: {
                deposit: 500
            }
        }
        const response = await sut.handle(request);
        expect(response.statusCode).toEqual(500);
        expect(response.body.msg).toEqual("Server Internal Error");
    })

    it("esperado que receba o controller consiga tratar erros 400",async ()=>{
        const { sut, useCase } = makeSut();
        vi.spyOn(useCase, "execute").mockRejectedValue({
            statusCode: 400,
            message: "Bad Request"
        });
        const request: HttpRequest = {
            user: {
                id: 400,    
            },
            body: {
                deposit: 400
            }
        }
        const response = await sut.handle(request);
        expect(response.statusCode).toEqual(400);
        expect(response.body.msg).toEqual("Bad Request");
    })
 
    it("esperado que receba o controller consiga tratar erros 404",async ()=>{
        const { sut, useCase } = makeSut();
        vi.spyOn(useCase, "execute").mockRejectedValue({
            statusCode: 404,
            message: "Not Found"
        });
        const request: HttpRequest = {
            user: {
                id: 404,    
            },
            body: {
                deposit: 404
            }
        }
        const response = await sut.handle(request);
        expect(response.statusCode).toEqual(404);
        expect(response.body.msg).toEqual("Not Found");
    })

    it("esperado que receba o controller mandar os status de 200 e os dados corretos para usuario se tudo estiver ok",async ()=>{
        const { sut } = makeSut();
        const request: HttpRequest = {
            user: {
                id: 1,    
            },
            body: {
                deposit: 50
            }
        }
        const { body, statusCode } = await sut.handle(request);
        const output = new DTOResponseDepositTransactionsUseCase({
            id_user: 1,
            name: "TEST",
            tipo: "Test",
            saldo: 50,
            data: new Date(2020,1,1,1,1,1,1),
            descricao: "Test",
        })
        expect(statusCode).toEqual(200);
        expect(body.params).toEqual(output);
    })

})
