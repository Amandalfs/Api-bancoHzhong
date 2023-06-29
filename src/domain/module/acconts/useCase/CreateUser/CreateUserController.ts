import { Request, Response } from "express";
import { ICreateUserUseCase } from "./CreateUserUseCase";
class CreateUserController {

    constructor(private CreateUserUseCase: ICreateUserUseCase){}

    async handle(req: Request, res: Response){
        const {username, name, nasc, typeaccont, email} = req.body;
        const { password, password2, cpf } = req.headers;
        
        await this.CreateUserUseCase.execute({username, name, nasc, typeaccont, email,  password, password2, cpf});

        return res.status(201).send('Conta no hzhong criada com sucesso');
    }
}

export {CreateUserController};
