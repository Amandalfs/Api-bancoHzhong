import { describe, it, expect, vi } from "vitest";
import { HttpRequest } from './../../../protocols/http'
import { IShowUserUseCase,DTORequestShowUserUseCase, DTOResponseShowUserUseCase } from "../../../../module/acconts/useCase/ShowUser/ShowUserUseCase"
import { ShowUserController } from "./ShowUserController";

interface TypesSut {
    sut: ShowUserController,
    useCase: IShowUserUseCase,
}

const makeSut = ():TypesSut =>{
    const useCaseShowMock = new class CreateUserUseCase implements IShowUserUseCase {
        execute(data: DTORequestShowUserUseCase): Promise<DTOResponseShowUserUseCase> {
            return new Promise(resolve => resolve(new DTOResponseShowUserUseCase({
                name: "test",
                username: "test01",
                saldo: 200,
                typeaccont: "poupanca",
                keypix: "null",
            },[{
                tipo: "saque",
                data: `000000`,
                descricao: "saque efetuado",
                saldo: 500,
            }])))
        }
       
    }

    const sut = new ShowUserController(useCaseShowMock);
    
    return {
        sut,
        useCase: useCaseShowMock,
    }
}

describe("Testando o controllador de criar sessao", ()=>{

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
 
    it("esperado que receba o controller consiga tratar erros 404",async ()=>{
        const { sut, useCase } = makeSut();
        vi.spyOn(useCase, "execute").mockRejectedValue({statusCode: 404, message: "Not Found"});
        const request: HttpRequest = {
            user: {
                id: 404,    
            }
        }
        const response = await sut.handle(request);
        expect(response.statusCode).toEqual(404);
        expect(response.body.msg).toEqual("Not Found");
    })

    it("esperado que o controlador consiga enviar os dados corretos no useCase",async ()=>{
        const { sut, useCase } = makeSut();
        const useCaseSpy = vi.spyOn(useCase, "execute").mock.calls
        const request: HttpRequest = {
            user: {
                id: 200,    
            }
        }
        await sut.handle(request);
        expect(useCaseSpy[0][0]).toEqual({
            id_user: 200
        })
    })

    it("Mandar Status de sucesso e os dados do usuario que estiver ok",async ()=>{
        const { sut } = makeSut();
        const request: HttpRequest = {
            user: {
                id: 200
            }
        }
        const { body } = await sut.handle(request);
        expect(body.params).toEqual({
            userSend: {
              name: 'test',
              username: 'test01',
              saldo: 200,
              typeaccont: 'poupanca',
              keypix: 'null'
            },
            extracts: [
              {
                tipo: 'saque',
                data: '000000',
                descricao: 'saque efetuado',
                saldo: 500
              }
            ]
          })
        })

})
