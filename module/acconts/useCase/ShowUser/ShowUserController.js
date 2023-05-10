

class ShowUserController{
    showUserUseCase
    constructor(ShowUserUseCase){
        this.showUserUseCase = ShowUserUseCase;
    }

    async handle(req, res){
        const { id } = req.user;
        
        const dados = await this.showUserUseCase.execute(id);

        return res.status(201).json({dados});
    }
}

module.exports = ShowUserController;