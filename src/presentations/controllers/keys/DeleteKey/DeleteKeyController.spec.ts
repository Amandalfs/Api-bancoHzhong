import { describe, it, expect, vi } from "vitest";
import { DeleteKeyController } from "./DeleteKeyController";
import { HttpRequest } from "../../../protocols/http";
import { DTOResponseDeleteKeyUseCase, IDeleteKeyUseCase } from "../../../../domain/module/keys/useCase/DeleteKey/DeleteKeyUseCase";

interface TypesSut {
    sut: DeleteKeyController,
    useCase: IDeleteKeyUseCase,
}

const makeSut = ():TypesSut =>{
	const useCaseDeleteMock = new class DeleteUseCase implements IDeleteKeyUseCase {
		execute(): Promise<DTOResponseDeleteKeyUseCase> {
			return new Promise(resolve => resolve(new DTOResponseDeleteKeyUseCase("Chave deletada com sucesso")));
		}
       
	};

	const sut = new DeleteKeyController(useCaseDeleteMock);
    
	return {
		sut,
		useCase: useCaseDeleteMock,
	};
};

describe("Testando o controlador de deleta chave", ()=>{

	it("esperado que receba o controller consiga tratar erros desconhecido",async ()=>{
		const { sut, useCase } = makeSut();
		vi.spyOn(useCase, "execute").mockRejectedValue(new Error);
		const request: HttpRequest = {
			user: {
				id: 500,    
			}
		};
		const response = await sut.handle(request);
		expect(response.statusCode).toEqual(500);
		expect(response.body.msg).toEqual("Server Internal Error");
	});

	it("esperado que receba o controller consiga tratar erros 400",async ()=>{
		const { sut, useCase } = makeSut();
		vi.spyOn(useCase, "execute").mockRejectedValue({statusCode: 400, message: "Bad Request"});
		const request: HttpRequest = {
			user: {
				id: 400,    
			}
		};
		const response = await sut.handle(request);
		expect(response.statusCode).toEqual(400);
		expect(response.body.msg).toEqual("Bad Request");
	});
    
    
	it("esperado que receba o controller consiga tratar erros 401",async ()=>{
		const { sut, useCase } = makeSut();
		vi.spyOn(useCase, "execute").mockRejectedValue({statusCode: 401, message: "Unauthorized"});
		const request: HttpRequest = {
			user: {
				id: 401,    
			}
		};
		const response = await sut.handle(request);
		expect(response.statusCode).toEqual(401);
		expect(response.body.msg).toEqual("Unauthorized");
	});

	it("esperado que receba o controller consiga tratar erros 404",async ()=>{
		const { sut, useCase } = makeSut();
		vi.spyOn(useCase, "execute").mockRejectedValue({statusCode: 404, message: "Not Found"});
		const request: HttpRequest = {
			user: {
				id: 404,    
			}
		};
		const response = await sut.handle(request);
		expect(response.statusCode).toEqual(404);
		expect(response.body.msg).toEqual("Not Found");
	});

	it("esperado que receba o controller envie os dados corretos para o useCase",async ()=>{
		const { sut, useCase } = makeSut();
		const useCaseSpy = vi.spyOn(useCase, "execute").mock.calls;
		const request: HttpRequest = {
			user: {
				id: 200,    
			}
		};
		await sut.handle(request);
		expect(useCaseSpy[0][0]).toEqual({id: 200});

	});
    
	it("esperado que receba o controller envie os dados para o usuario que tudo der certo",async ()=>{
		const { sut } = makeSut();
		const request: HttpRequest = {
			user: {
				id: 200,    
			}
		};
		const response = await sut.handle(request);
		expect(response.statusCode).toEqual(200);
		expect(response.body.params).toEqual({msg:"Chave deletada com sucesso"});

	});
    
});
