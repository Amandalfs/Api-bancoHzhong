import { describe, it, expect, vi } from "vitest";
import { HttpRequest } from "./../../../protocols/http";
import { IModifyUserUseCase, outputModifyUserDTO } from "../../../../domain/module/acconts/useCase/ModifyUser/ModifyUserUseCase";
import { ModifyUserController } from "./ModifyUserController";

interface TypesSut {
    sut: ModifyUserController,
    useCase: IModifyUserUseCase,
}

const makeSut = ():TypesSut =>{
	const useCaseModifyUseCaseMock = new class ModifyUseCase implements IModifyUserUseCase {
		async execute(): Promise<outputModifyUserDTO> {
			return new Promise(resolve => resolve({
				email: "new email",
				name: "new name",
				username: "new username",
			}));
		}
	};

	const sut = new ModifyUserController(useCaseModifyUseCaseMock);
    
	return {
		sut,
		useCase: useCaseModifyUseCaseMock,
	};
};

describe("Modify user controller tests units", ()=>{
	it("should throw a 500 server error status", async ()=>{
		const { sut, useCase } = makeSut();
		vi.spyOn(useCase, "execute").mockRejectedValue(new Error);
		const request: HttpRequest = {
			body: {
				username: "Error500",
				name: "Error500Name", 
				email: "Error500Email"
			}
		};
		const response = await sut.handle(request);
		expect(response.statusCode).toEqual(500);
		expect(response.body.msg).toEqual("Server Internal Error");
	});

	it("should throw a 400 bad request error status", async ()=>{
		const { sut, useCase } = makeSut();
		vi.spyOn(useCase, "execute").mockRejectedValue({
			statusCode: 400,
			message: "Bad Request"
		});
		const request: HttpRequest = {
			body: {
				username: "Error400",
				name: "Error400Name", 
				email: "Error400Email"
			},
			user: {
				id: 1
			}
		};
		const response = await sut.handle(request);
		expect(response.statusCode).toEqual(400);
		expect(response.body.msg).toEqual("Bad Request");
	});

	it("should throw a 401 unauthorized error status", async ()=>{
		const { sut, useCase } = makeSut();
		vi.spyOn(useCase, "execute").mockRejectedValue({
			statusCode: 401,
			message: "Unauthorized"
		});
		const request: HttpRequest = {
			body: {
				username: "Error400",
				name: "Error400Name", 
				email: "Error400Email"
			},
			user: {
				id: 1
			}
		};
		const response = await sut.handle(request);
		expect(response.statusCode).toEqual(401);
		expect(response.body.msg).toEqual("Unauthorized");
	});

	it("should throw a 403 forbidden error status", async ()=>{
		const { sut, useCase } = makeSut();
		vi.spyOn(useCase, "execute").mockRejectedValue({
			statusCode: 403,
			message: "Forbidden"
		});
		const request: HttpRequest = {
			body: {
				username: "Error400",
				name: "Error400Name", 
				email: "Error400Email"
			},
			user: {
				id: 1
			}
		};
		const response = await sut.handle(request);
		expect(response.statusCode).toEqual(403);
		expect(response.body.msg).toEqual("Forbidden");
	});

	it("should throw a 404 not found error status", async ()=>{
		const { sut, useCase } = makeSut();
		vi.spyOn(useCase, "execute").mockRejectedValue({
			statusCode: 404,
			message: "Not Found"
		});
		const request: HttpRequest = {
			body: {
				username: "Error400",
				name: "Error400Name", 
				email: "Error400Email"
			},
			user: {
				id: 1
			}
		};
		const response = await sut.handle(request);
		expect(response.statusCode).toEqual(404);
		expect(response.body.msg).toEqual("Not Found");
	});

	it("should be able to send the data correctly to the use case", async ()=>{
		const { sut, useCase } = makeSut();
		const useCaseSpy = vi.spyOn(useCase, "execute");
		const request: HttpRequest = {
			body: {
				username: "Success",
				name: "Success", 
				email: "Success",
				oldPassword: "Success",
				password: "Success",
			},
			user: {
				id: 1
			}
		};
		await sut.handle(request);
		expect(useCaseSpy.mock.calls[0][0].userUpdate).toEqual({
			username: "Success",
			name: "Success", 
			email: "Success",
			oldPassword: "Success",
			password: "Success",
		});
	});
    
	it("should be able to modify a user and return success.", async ()=>{
		const { sut } = makeSut();
		const request: HttpRequest = {
			body: {
				username: "new username",
				name: "new name", 
				email: "new email",
				oldPassword: "old password",
				password: "new password",
			},
			user: {
				id: 1
			}
		};
		const response = await sut.handle(request);
		expect(response.statusCode).toEqual(200);
		expect(response.body.params).toEqual({
			email: "new email",
			name: "new name",
			username: "new username",
		});
	});
});

