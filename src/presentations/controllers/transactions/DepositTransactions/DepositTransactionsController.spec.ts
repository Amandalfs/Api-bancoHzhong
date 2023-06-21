import { describe, it, expect, vi } from "vitest";
import { DepositTransactionsController } from "./DepositTransactionsController";
import { DTORequestDepositTransactionsUseCase, DTOResponseDepositTransactionsUseCase, IDepositTransactionsUseCase } from "../../../../module/transactions/useCase/DepositTransactions/DepositTransactionsUseCase";
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
                data: "00000",
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
            }
        }
        const response = await sut.handle(request);
        expect(response.statusCode).toEqual(500);
        expect(response.body.msg).toEqual("Server Internal Error");
    })
 


})
