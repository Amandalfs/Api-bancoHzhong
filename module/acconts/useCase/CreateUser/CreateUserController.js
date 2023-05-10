class CreateUserController {
    createUserUseCase;
    constructor(CreateUserUseCase){
        this.createUserUseCase = CreateUserUseCase;
    }

    async handle(req, res){
        const {username, name, nasc, typeaccont, email} = req.body;
        const { password, cpf } = req.headers;

        await this.createUserUseCase.execute({username, name, nasc, typeaccont, email,  password, cpf});

        return res.status(201).send('Conta no hzhong criada com sucesso');
    }
}

module.exports = CreateUserController;