class CreateKeyController {
    createKeyUseCase;
    constructor(CreateKeyUseCase){
        this.createKeyUseCase = CreateKeyUseCase;
    }

    async handle(req, res){
        const { id } = req.user;

        const keypix = await this.createKeyUseCase.execute(id);

        return res.status(201).send({"key":keypix});
    }
}

module.exports = CreateKeyController;