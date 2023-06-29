import { IDepositTransactionsUseCase } from "./DepositTransactionsUseCase";

class DepositTransactionsController{
    constructor(private depositTransactionsUseCase: IDepositTransactionsUseCase){}

    async handle(req, res){
        const { deposit } = req.body;
        const { id } = req.user;

        await this.depositTransactionsUseCase.execute({id, deposit});

        return res.status(202).send("Deposito efetuado com sucesso");
    }
}

export {DepositTransactionsController};
