const ExtractsRepository = require('../repositories/ExtractsRepository');

const ExtractsByDatesService = require('../services/ExtractsByDatesService/ExtractsByDatesService');

class TransitionsController{

    async extract(req, res){
        const { id } = req.user
        const {dateInicial, dateFinal} = req.body

        const extractsRepository = new ExtractsRepository;
        const extractsByDatesService = new ExtractsByDatesService(extractsRepository);
        const extracts = await extractsByDatesService.execute(id, dateInicial, dateFinal);

        return res.status(201).send(extracts);

    }

    
}

module.exports = TransitionsController;