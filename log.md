# Log de Atualizacoes da api Hzhong

## Versão 2.0.11 - 15/06/2023

# Refatoracao
- desacoplado a funcao de verificar idade para uma classe com uma interface IVerifyAge e invertido a dependencia.
- desacoplado a funcao de validar o cpf para uma classe com uma interface IValidarCpf e invertido a dependencia.
- Mudado os arquivos de repositorio de conexao com banco de dados com knex para uma pasta a nivel mais a baixo para chamado KnexRepositories.
- modificado o erro de cpf invalido para uma classe de InvalidCpfError.
- excluido a funcao de gerar data para uma uam funcao propria do javascript.
- desacoplado a funcao de keyGenerator para uma classe com uma interface IKeyGenerator e invertido a dependencia.
- Criado uma interface para o contador de saque por dia e substituido todos parametros para um unico objeto.
- Criado uma interface para o contador de envio para usuario por dia e substituido todos parametros para um unico objeto.
- Criado uma interface para o metodo para procurar os extratos de acordo com a data definida e substituido todos parametros para um unico objeto.
- trocado a comparação dentro da funcao de somatorio de envio e saque para comparação com date-fns
- desacoplado a funcao de crptografar a senha para uma classe com uma interface Codificador que tem um metodo de crptografia e invertido a dependencia.

<br>
<br>
<br>

## Versão 2.0.10 - 14/06/2023

### Refatoracao
- substituido varias importacao de erros do useCaseCreateUsers para um index principal
- substituido a importacao de erros do useCaseSessions para um index principal
- substituido a importacao de erros do useCaseShow para um index principal

- substituido varias importacao de erros do useCaseCreateKey para um index principal
- substituido varias importacao de erros do useCaseDelete para um index principal
- substituido varias importacao de erros do useCaseShow para um index principal

- substituido varias importacao de erros do useCaseDepositTransactions para um index principal
- substituido varias importacao de erros do useCaseSendingTransactions para um index principal
- substituido varias importacao de erros do useCaseWithdrawTransactions para um index principal

<br>
<br>
<br>

## Versão 2.0.9 - 13/06/2023

### Adicionado
- Adicionado de erro de recurso nao encontrado no UseCaseDeposit
- Adicionado de erro de recurso nao encontrado no UseCaseSending

### Refatoracao
- Mudado o erro de Resource not Found que foi criado com AppError no WithdrawUseCase para a classe Resource not Found
- Mudado a implementacao do useCase Sessions para implementar o IUseCaseSessions tornando mais legivel e tipado.
- Mudado a implementacao do useCase Show para implementar o IUseCaseShow tornando mais legivel e tipado.
- Mudado a implementacao do useCase CreateKey para implementar o IUseCaseCreateKey tornando mais legivel e tipado.
- Mudado a implementacao do useCase deleteKey para implementar o IUseCaseDeleteKey tornando mais legivel e tipado.
- Mudado a implementacao do useCase ShowKey para implementar o IUseCaseShowKey tornando mais legivel e tipado.
- Mudado a implementacao do useCase DepositTransactions para implementar o IUseCaseDepositTransactions tornando mais legivel e tipado.
- Mudado a implementacao do useCase ExtractsByDate para implementar o IUseCaseExtractsByDate tornando mais legivel e tipado.
- Mudado a implementacao do useCase SendingMoneyTransactions para implementar o IUseCase SendingMoneyTransactions tornando mais legivel e tipado.
- Mudado a implementacao do useCase WithdrawTransactions para implementar o IUseCase tornando mais legivel e tipado.


<br>
<br>
<br>

## Versão 2.0.8 - 08/06/2023

### Adicionado
- Error Accont Exists.
- Error Confirmation Password Invalid.
- Error Password Or Username Invalid.
- Error Key Already Exists.
- Error Key Does Not Exist.
- Error Invalid Value.
- Error Balance Insuficient.
- Error Invalid Pix Key.
- Error Cannot Send Money To Your Account.
- Error Token Not Sent.
- Error User Under 18 Years Old.
- Validando se o usuario ja existe no UseCase CreateKey
- Validando se o usuario ja existe no UseCase DeleteKey
- Validando se o usuario ja existe no UseCase ShowKey

### Refatoracao
- alterado um erros globais sobre ```conta ja existente``` criado com o AppError para um erro especifico a onde vai facilitar a leitura.
- alterado o erro de ```senhas direntes``` criado com o AppError para um erro criado com uma classe com seu nome para maior facilidade de entendimento na hora da manutenção.  
- alterado o erro de ```senha ou username invalidos``` criado com o AppError para um erro criado com uma classe do nome do erro para maior entendimento e facilidade na hora da manutenção.  
- alterado o erro ```Chave ja existente``` criado com o AppError para um erro criado com uma classe do nome do erro para maior entendimento e facilidade na hora da manutenção.  
- alterado o erro ```Chave não Existe``` criado com o AppError para um erro criado com uma classe do nome do erro para maior entendimento e facilidade na hora da manutenção.  
- alterado o erro ```Valor Invalido``` criado com o AppError para um erro criado com uma classe do nome do erro para maior entendimento e facilidade na hora da manutenção.  
- alterado o erro ```Saldo Insuficiente``` criado com o AppError para um erro criado com uma classe do nome do erro para maior entendimento e facilidade na hora da manutenção.  
- alterado o erro ```Chave Pix Inválida``` criado com o AppError para um erro criado com uma classe do nome do erro para maior entendimento e facilidade na hora da manutenção.  
- alterado o erro ```Voce não pode enviar dinheiro para voce``` criado com o AppError para um erro criado com uma classe do nome do erro para maior entendimento e facilidade na hora da manutenção.  
- alterado o erro ```Token nao recebido``` criado com o AppError para um erro criado com uma classe do nome do erro para maior entendimento e facilidade na hora da manutenção.  
- alterado o erro ```Usuario menor de idade``` criado com o AppError para um erro criado com uma classe do nome do erro para maior entendimento e facilidade na hora da manutenção.  


<br>
<br>
<br>

## Versão 2.0.7 - 05/06/2023

### Adicionado
- dentro do app na captura de erros foi adicionado a captura de erros que sao filhos do AppError para criacao de erros especificos na facilitacao de leitura dos erros.
- Interfaces novas para o CreateUserUseCase sendo elas o ICreateReponseDTO e o ICreateUserUseCase para implementacao do useCase.
- Criado um erro especifico para recurso nao encontrado. 
- Criado um erro especifico para usuario nao authorizado.
- Criado um erro especifico de limite diario.
- Criado um erro especifico de limite.
- Verificacao do useCaseSendingMoney a onde o usuario com o tipo de conta poupanca so pode sacar ate 1500 por dia no envio de dinheiro.
- Verificacao do useCaseSendingMoney a onde o usuario com o tipo de conta corrente so pode sacar ate 4000 por dia no envio de dinheiro.
- Verificacao do useCaseSendingMoney a onde o usuario com o tipo de conta universitaria so pode sacar ate 2250 por dia no envio de dinheiro.

### alterado 
- alterado o nome da classe de erro de recurso nao encontrado para ResourceNotFoundError para ficar um nome mais claro dizendo que aquela classe é sobre um erro.
- tirado os try catchs do useCase e agora e so ficara no controller para pegar erros desconhecidos.

### Refatoracao
- tirado o CreateUserUseCase do CreateUserController para colocar a interface do UseCase assim ele nao tera ligacao direta com o useCase.
- adicionado o ResourceNotFound para padrazinhacao do erro no  ShowUseCase.
- refatoracao feita no useCase de Saque para ter um array com os limites de saque verificar se o usuario atingiu o seu limite de acordo com o array.
- refatoracao feita no useCase de Saque para ter um array com os limites de saque verificar se o usuario atingiu o seu limite diario de acordo com o array.
- refatoracao feita no useCase De envio para ter somente um array com os limites de cada tipo usado um for para percorrer o array e verificar se o usuario esta envia um valor maior que seu limite. 

<br>
<br>
<br>

## Versão 2.0.6 - 01/06/2023

### Adicionado
- Adicionado uma configuracao de banco de dados docker-compose para no futuro fazer os testes E2E por motivos do postgres ter os schemas dentro dele e pode criar e deletar varios.


### Refactoracao
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