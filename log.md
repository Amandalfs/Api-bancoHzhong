# Log de Atualizacoes da api Hzhong

## Versão 2.0.7 - 05/06/2023

### Adicionado
- dentro do app na captura de erros foi adicionado a captura de erros que sao filhos do AppError para criacao de erros especificos na facilitacao de leitura dos erros.
- Interfaces novas para o CreateUserUseCase sendo elas o ICreateReponseDTO e o ICreateUserUseCase para implementacao do useCase.
- Criado um erro especifico para recurso nao encontrado. 
- Criado um erro especifico para usuario nao authorizado.
- Criado um erro especifico de limite diario.
- Criado um erro especifico de limite.

### alterado 
- alterado o nome da classe de erro de recurso nao encontrado para ResourceNotFoundError para ficar um nome mais claro dizendo que aquela classe é sobre um erro.

### Refatoracao
- tirado o CreateUserUseCase do CreateUserController para colocar a interface do UseCase assim ele nao tera ligacao direta com o useCase.
- adicionado o ResourceNotFound para padrazinhacao do erro no  ShowUseCase.
- refatoracao feita no useCase para ter um for com os limites.

<br>
<br>
<br>

## Versão 2.0.6 - 01/06/2023

### Adicionado
- Adicionado uma configuracao de banco de dados docker-compose para no futuro fazer os testes E2E por motivos do postgres ter os schemas dentro dele e pode criar e deletar varios.


### Refactor
- Refatorado todos os testes adicionado e aplicando o pattern Sut para nao ter que instanciar tudo e ficar claro de quem esta sendo testado naquele switch de teste.

### Corrigido
- Corrigido um erro que não estava previsto no teste do useCase dos Extratos com data inicial e final. Esse erro ocorria porque o array estava sendo retornado sem a devida filtragem das datas, resultando em um array vazio. <br>
Melhorei a lógica utilizando a biblioteca date-fns para realizar comparações precisas com as funções isAfter, isBefore e isEqual. Também adicionei um teste com mocks, criando uma data fora do intervalo para verificar se ela está sendo excluída corretamente. Além disso, criei 5 datas dentro do intervalo especificado.


<br>
<br>
<br>


## Versão 2.0.5 - 30/05/2023
### Alterado
- mudado o useCaseWithdraw colocando um limite diario de saque para contas poupancas de 1500.
- mudado o useCaseWithdraw colocando um limite diario de saque para contas corrente de 4000.
- mudado o useCaseWithdraw colocando um limite diario de saque para contas universitaria de 2250.

### Adicionado 
- adicionado uma funcao para retornar o valor total de saque do usuario naquele dia.
- adicionado uma funcao para retornar o valor total de envio do usuario naquele dia.

<br>
<br>
<br>

## Versão 2.0.4 - 25/05/2023
### Alterado
- mudado o useCaseSendingMoney colocando um limite  de envio de R$300 para contas poupancas.
- mudado o useCaseSendingMoney colocando um limite  de envio de R$800 para contas correntes.
- mudado o useCaseSendingMoney colocando um limite  de envio de R$450 clearpara contas universitarias.

<br>
<br>
<br>

## Versão 2.0.3 - 24/05/2023

### Adicionado 
- criado a documentação  da rota show keypix.
- criado a documentação  da rota create keypix.
- criado a documentação da rota delete keypix.

### Alterado
- mudado o useCaseWithdraw colocando um limite de R$300 por saque para contas do tipo poupanca.
- mudado o useCaseWithdraw colocando um limite de R$800 por saque para contas do tipo corrente.
- mudado o useCaseWithdraw colocando um limite de R$450 por saque para contas do tipo universitaria.

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
### Corrigido
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