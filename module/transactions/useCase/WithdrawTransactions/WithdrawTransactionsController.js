class WithdrawTransactionsController{
    withdrawTransactionsUseCase;
    constructor(WithdrawTransactionsUseCase){
        this.withdrawTransactionsUseCase = WithdrawTransactionsUseCase;
    }

    async handle(req, res){
        const { valueWithdraw } = req.body;
        const { id } = req.user;

        await this.withdrawTransactionsUseCase.execute({valueWithdraw, id});

        return res.status(200).send({"Saque efetuado com sucesso":valueWithdraw});
    }
}   

module.exports = WithdrawTransactionsController;