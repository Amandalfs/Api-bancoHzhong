import { describe, expect, it } from "vitest";
import { InMemoryExtractsRepository } from "../../../../../repositories/inMemory/InMemoryExtractsRepository";
import { ShowUserUseCase } from "../ShowUserUseCase";
import { InMemoryUsersRepository } from "../../../../../repositories/inMemory/InMemoryUsersRepository";
import { AppError } from "../../../../../utils/AppError";


describe("Testando a funcionalidade show users", ()=>{

    it("Usuario nao deve conseguir usar show sem uma conta", async ()=>{
        const usersRepository = new InMemoryUsersRepository;
        const extractsRepository = new InMemoryExtractsRepository;
        const showUserUseCase = new ShowUserUseCase(usersRepository, extractsRepository);
        await expect(showUserUseCase.execute(515)).rejects.toEqual(new AppError("Usuario nao encontrado"))
    })
})