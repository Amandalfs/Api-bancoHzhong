const generatorDate = require('../utils/dateGenerator');
const date = require('../utils/date');

const { compare } = require('bcrypt')

const garantirAuth = require('../middlewares/garantirAuth');
const dbUsers = require('../sql/dbUsers');
const dbExtratos = require('../sql/dbExtratos');
const db = require('../sql/knex/index');

const verificarDados = (req, res, next) =>{
    const { deposit } = req.body;
    const { password } = req.headers;

    const errors = [];

    if(!deposit){
        errors.push("O valor do deposito nao foi informado")
    }

    if(deposit<=0){
        errors.push("valor do deposito invalido");
    }

    if(!password){
        errors.push("A senha nao foi informada");
    }

    if(errors.length!==0){
        return res.status(401).send({errors});
    }

    next()
}


const NotAutheticPassword = async (req, res, next) =>{
    
    const { id } = req.user;
    const { password } = req.headers;

    const user = await dbUsers.getUserById({id: id});
    
    const passwordPassed = await compare(password, user.password);

    if(!passwordPassed){
        return res.status(401).send("Senha digitada esta errada")
    }

    next();
}


const depositUsers = (app) => {
    app.route('/users/depositUser')
        .patch(garantirAuth, verificarDados, NotAutheticPassword, async(req, res)=>{
            const { deposit } = req.body;
            const { id } = req.user;

            const tipo = "deposito";
            const data = generatorDate();

            const user = await dbUsers.getUserById({id: id});

            const saldoNovo = user.saldo + deposit;
            console.log(saldoNovo)

            const name = user.name;
            const desc = `Voce depositou R$${deposit.toFixed(2).replace('.',',')}`

            const extratoNew = {
                id_user: id,
                name: name,
                tipo: tipo,
                saldo: deposit,
                data: data,
                descricao: desc,
            }

            await dbExtratos.createExtrato(extratoNew)
            await dbUsers.updateUser({id: id}, {saldo: saldoNovo})

            return res.status(200).send("Deposito efetuado com sucesso");
        })
}

module.exports = depositUsers;