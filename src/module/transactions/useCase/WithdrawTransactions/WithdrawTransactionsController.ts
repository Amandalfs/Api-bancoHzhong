import { IWithdrawTransctionsUseCase } from "./WithdrawTransactionsUseCase";

class WithdrawTransactionsController{
    constructor(private withdrawTransactionsUseCase: IWithdrawTransctionsUseCase){    }

    async handle(req, res){
        const { valueWithdraw } = req.body;
        const { id } = req.user;

        await this.withdrawTransactionsUseCase.execute({valueWithdraw, id});

        return res.status(200).send({"Saque efetuado com sucesso":valueWithdraw});
    }
}   

export {WithdrawTransactionsController};