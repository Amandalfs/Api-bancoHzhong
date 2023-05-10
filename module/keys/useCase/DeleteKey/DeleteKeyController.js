

class DeleteKeyController {
    deleteKeyUseCase;
    constructor(DeleteKeyUseCase){
        this.deleteKeyUseCase = DeleteKeyUseCase;
    }

    async handle(req, res){
        const { id } = req.user

        await this.deleteKeyUseCase.execute(id);

        return res.status(200).send({"msg": "Chave Deletada com sucesso"});
    }

}

module.exports = DeleteKeyController;