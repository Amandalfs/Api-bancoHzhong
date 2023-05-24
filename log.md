# Log de Atualizacoes da api Hzhong

## Versão 2.0.3 - 24/05/2023

## Adicionado 
- criado a documentação  da rota show keypix.
- criado a documentação  da rota create keypix.
- criado a documentação da rota delete keypix.

## Alterado
- mudado o useCaseWithdraw colocando um limite de R$300 por saque para contas do tipo poupanca.

<br>
<br>
<br>

## Versão 2.0.2 - 23/05/2023
### Adicionado
- criado a documentação da rota show user.
- criado a documentação da rota sessions user.
- criado a documentação da rota de sendingMoney.
- criado a documentação da rota de extractsByDate.
- criado a documentação da rota de deposit.
- criado a documentação da rota de withdraw.

<br>
<br>
<br>

## Versão 2.0.1 - 22/05/2023
### Adicionado
- dependencia vitest ui para visualizacao para mais uma opcao de visualizacao dos testes.
- criado a documentação da rota de criar um novo usuario.

### Alterado
- trocado a rota de login que estava na localhost:8888/users para localhost:8888/users/sessions.
- trocado o jeito de conseguir a requisicao do extracts show que estava no body para query.
### Corrijido
- concertado o bug que estava acontecendo de os testes pararem depois que tudo desse sucesso mesmo no modo de watch.

<br>
<br>
<br>

## Versão 2.0.0 - 19/05/2023 
### Adicionado
- Criacao do Repository InMemory do extracts.
- Criacao dos testes do UseCase ShowUsers e Testes Executados com status de sucesso.
- Criacao dos testes do UseCase CreateKey e Testes Executados com status de sucesso.
- Criacao dos testes do UseCase DeleteKey e Testes Executados com status de sucesso.
- Criacao dos testes do UseCase ShowKey e Testes Executados com status de sucesso.
- Criacao dos testes do UseCase DepositTransactions e Testes Executados com status de sucesso.
- Criacao dos testes do UseCase ExtractsByDateTransactions e Testes Executados com status de sucesso.
- Adicionado uma verificao no envio de dinheiro para usuario nao enviar dinheiro negativo.
- Criacao dos testes do UseCase SendingMoney e Testes Executados com status de sucesso.
- Criacao dos testes do UseCase WithdrawMoney e Testes Executados com status de sucesso.