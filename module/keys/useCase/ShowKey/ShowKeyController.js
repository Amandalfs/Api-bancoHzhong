

class ShowKeyController {
    showKeyUseCase
    constructor(ShowKeyUseCase){
        this.showKeyUseCase = ShowKeyUseCase;
    }

    async handle(req, res){
        const { id } = req.user;
       
        const keypix = await this.showKeyUseCase.execute(id);
 
        return res.status(200).json(keypix);
    }
}

module.exports = ShowKeyController;