
class ExtractsByDataController {
    extractsByDataUseCase
    constructor(ExtractsByDataUseCase){
        this.extractsByDataUseCase = ExtractsByDataUseCase
    }

    async handle(req, res){
        const { id } = req.user
        const {dateInicial, dateFinal} = req.body

        const extracts = await this.extractsByDataUseCase.execute(id, dateInicial, dateFinal);

        return res.status(201).json(extracts);
    }
}

module.exports = ExtractsByDataController;