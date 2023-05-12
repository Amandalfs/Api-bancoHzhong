import { ShowUserUseCase } from "./ShowUserUseCase";


class ShowUserController{
    showUserUseCase
    constructor(ShowUserUseCase: ShowUserUseCase){
        this.showUserUseCase = ShowUserUseCase;
    }

    async handle(req, res){
        const { id } = req.user;
        
        const dados = await this.showUserUseCase.execute(id);

        return res.status(201).json({dados});
    }
}

export { ShowUserController };