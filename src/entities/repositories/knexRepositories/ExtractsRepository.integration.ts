import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { db } from "../../../sql/knex";
import { ExtractsRepository } from "./ExtractsRepository";

describe("repository extracts tests integrations  by knex", () => {

    beforeEach(()=>{
        vi.useFakeTimers();
    })

    afterEach(async  () => {
        await db("extratos").del();
        await db("users").del();
        vi.useRealTimers();
    })

    it("should create extract", async ()=>{
        const [{ id }] = await db("users").insert({
            name: "Usuario Test",
            username: "UsuarioTest",
            nasc: "02-10-2003",
            typeaccont: "poupanca",
            password: "12345678",
            cpf: "12603863096",
            agencia: "123",
            saldo: 50,
            keypix: null,
        }).returning("id");

        const schemaExtract = {
            data: new Date(),
            descricao: "test",
            id_user: id,
            name: "Test",
            saldo: 150,
            tipo: "Saque",
        }

        await new ExtractsRepository().createExtracts(schemaExtract);
        const extract = await db("extratos").where("id_user", id).first();
        expect(extract).toMatchObject(schemaExtract)
    });

    
    it("Should be able to fetch the 5 most recent extracts.", async ()=>{
        vi.setSystemTime(new Date(2023, 1, 1));

        const [{ id }] = await db("users").insert({
            name: "Usuario Test",
            username: "UsuarioTest",
            nasc: "02-10-2003",
            typeaccont: "poupanca",
            password: "12345678",
            cpf: "12603863096",
            agencia: "123",
            saldo: 50,
            keypix: null,
        }).returning("id");

        const schemaExtract = {
            data: new Date(),
            descricao: "test",
            id_user: id,
            name: "Test",
            saldo: 150,
            tipo: "Saque",
        }
        for (let index = 0; index < 10; index++) {
            await db("extratos").insert(schemaExtract);
        }

        const extracts = await new ExtractsRepository().SearchForMoreRecentExtractsById(id);
        expect(extracts).toHaveLength(5);
        expect(extracts[0]).toEqual({
            tipo: 'Saque',
            saldo: 150,
            data: new Date(),
            descricao: 'test'
          })
    });

    it("should be able to search for all extracts within a time period.", async ()=>{
        vi.setSystemTime(new Date(2023, 5, 1));

        const [{ id }] = await db("users").insert({
            name: "Usuario Test",
            username: "UsuarioTest",
            nasc: "02-10-2003",
            typeaccont: "poupanca",
            password: "12345678",
            cpf: "12603863096",
            agencia: "123",
            saldo: 50,
            keypix: null,
        }).returning("id");

        const schemaExtract = {
            data: new Date(2023, 1, 1),
            descricao: "test",
            id_user: id,
            name: "Test",
            saldo: 150,
            tipo: "Saque",
        }

        await db("extratos").insert(schemaExtract);
        
        for (let index = 1; index <= 10; index++) {
            await db("extratos").insert({
                data: new Date(2023, 4, index),
                descricao: "test",
                id_user: id,
                name: "Test",
                saldo: 150,
                tipo: "Saque",
            });
        }

        const extracts = await new ExtractsRepository().SearchForDataStartAndEndbyId({
            id,
            dateStart: new Date(2023, 4, 1),
            dateEnd: new Date(2023, 5, 1),
        })
        expect(extracts).toHaveLength(10);
        expect(extracts[0]).toEqual({
            tipo: 'Saque',
            saldo: 150,
            data: new Date(2023, 4, 1),
            descricao: 'test'
        })
    })

    it("Should be able to count the total withdrawal amount.", async () =>{
        vi.setSystemTime(new Date(2023, 5, 1));

        const [{ id }] = await db("users").insert({
            name: "Usuario Test",
            username: "UsuarioTest",
            nasc: "02-10-2003",
            typeaccont: "poupanca",
            password: "12345678",
            cpf: "12603863096",
            agencia: "123",
            saldo: 50,
            keypix: null,
        }).returning("id");

        const schemaExtract = {
            data: new Date(2023, 1, 1),
            descricao: "test",
            id_user: id,
            name: "Test",
            saldo: 150,
            tipo: "Saque",
        }

        await db("extratos").insert(schemaExtract);
        
        for (let index = 1; index <= 10; index++) {
            await db("extratos").insert({
                data: new Date(2023, 4, index),
                descricao: "test",
                id_user: id,
                name: "Test",
                saldo: 150,
                tipo: "Saque",
            });
        }

        const total = await new ExtractsRepository().CountByWithdraw({
            dateStart: new Date(2023, 4, 1),
            dateEnd: new Date(2023, 5, 1),
            UserId: id,
        })
        expect(total).toEqual(1500);
    
    })
})