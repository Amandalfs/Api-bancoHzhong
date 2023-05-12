import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {

    constructor(private CreateUserUseCase: CreateUserUseCase){}

    async handle(req: Request, res: Response){
        const {username, name, nasc, typeaccont, email, password, password2, cpf } = req.body;
        
        await this.CreateUserUseCase.execute({username, name, nasc, typeaccont, email,  password, password2, cpf});

        return res.status(201).send('Conta no hzhong criada com sucesso');
    }
}

export {CreateUserController};
