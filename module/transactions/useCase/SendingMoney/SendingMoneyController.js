class SendingMoneyController {
    sendingMoneyUseCase;
    constructor(SendingMoneyUseCase){
        this.sendingMoneyUseCase = SendingMoneyUseCase;
    }

    async handle(req, res){
        const { id } = req.user;
        const {deposit, keypix } = req.body;
      
        const extracts = await this.sendingMoneyUseCase.execute(id, keypix, deposit);
    
        return res.status(201).send({extracts});
    }

}

module.exports = SendingMoneyController;