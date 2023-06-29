# Changelog de Atualizacoes da api Hzhong


## Versão 2.0.18 - 29/06/2023

### Adicionado
- Criado o tratamento de erro 401 no controlador ShowKey.
- Criado o tratamento de erro 404 no controlador ShowKey.
- Retornado a chave pix do usuario no controlador ShowKey.
- Criado o controlador independente CreateKeyController e criado o tratamento de erros desconhecidos.
- Criado o tratamento de erro 400 no controlador CreateKey.
- Criado o tratamento de erro 401 no controlador CreateKey.
- Criado o tratamento de erro 404 no controlador CreateKey.
- Retornado a chave pix do usuario no controlador CreateKey.
- Criado o controlador independente DeleteKeyController e criado o tratamento de erros desconhecidos.
- Criado o tratamento de erro 400 no controlador DeleteKey.

### Teste
- Criado o teste para ver que os parametros estao entrando corretamente no controlador de monstrar chave.
- Criado o teste para ver que os parametros estao entrando corretamente no controlador de criar chave.

### Refatoracao
- Substituido as interfaces DTOs do useCase CreateKeyUseCase para classes DTOs.
- Substituido as interfaces DTOs do useCase DeleteKeyUseCase para classes DTOs.
- Movido a pasta de useCase para domain e movido a pasta Repositories para entities.


<br>
<br>
<br>

## Versão 2.0.17 - 28/06/2023

### Adicionado
- Criado o controlador independente ShowKeyController e criado o tratamento de erros desconhecidos.
- Criado o tratamento de erro 400 no controlador ShowKey.

### Refatoracao
- Substituido as interfaces DTOs do useCase ShowKeyUseCase para classes DTOs.

<br>
<br>
<br>


## Versão 2.0.16 - 26/06/2023

### Adicionado
- Criado o controlador independente SendingMoneyTransactions e criado o tratamento de erros desconhecidos.
- Criado o tratamento de erro 400 no controlador sendingMoneyTransactions.
- Criado o tratamento de erro 401 no controlador sendingMoneyTransactions.
- Criado o tratamento de erro 404 no controlador sendingMoneyTransactions.
- Criado o teste para ver que o controlador SendigMoneyTransctions esta enviando os dados corretos para o useCase.
- criado o retorno de sintaxe invalida caso o usuario nao mande a keypix no body no sendingMoneyTransactions.
- criado o retorno de sintaxe invalida caso o usuario nao mande o valor no body no sendingMoneyTransactions. 
- Criado a resposta de status 200 e o envio dos dados que o useCase envia para
SendingMoneyTransactionsController.
- Adicionado a propriedade query no protocolo http de requisicao. 
- Criado o controlador independente ExtractsByDateTransactions e criado o tratamento de erros desconhecidos.
- Criado o tratamento de erro 400 no controlador extractsByDateTransactions.
- Criado o tratamento de erro 401 no controlador extractsByDateTransactions.
- Criado o tratamento de erro 404 no controlador extractsByDateTransactions.
- Criado o teste para ver que o controlador ExtractsByDateTransctions esta enviando os dados corretos para o useCase.
- criado o retorno de sintaxe invalida caso o usuario nao mande a dateStart no query no extractsByDateTransactions controller.
- criado o retorno de sintaxe invalida caso o usuario nao mande a dateEnd no query no extractsByDateTransactions controller.
- Criado a resposta de status 200 e o envio dos dados que o useCase envia para
ExtractsByDateTransactionsController.

### Refatoracao
- Substituido as interfaces DTOs do useCase SendingMoneyTransactions para classes DTOs.
- Substituido as interfaces DTOs do useCase ExtractsByDateTransactions para classes DTOs.


<br>
<br>
<br>

## Versão 2.0.15 - 22/06/2023

### Adicionado
- Criado o controlador independente WithdrawTransactions e criado o tratamento de erros desconhecidos.
- Criado o tratamento de erro 400 no controlador WithdrawTransactions.
- Criado o tratamento de erro 401 no controlador WithdrawTransactions.
- Criado o tratamento de erro 404 no controlador WithdrawTransactions.
- Criado o teste para ver que o usuario deixou de enviar os parametros no controlador WithdrawTransactions.
- Criado o teste para ver que o controlador WithdrawTransctions esta enviando os dados corretos para o useCase.
- Criado a resposta de status 200 e o envio dos dados que o useCase envia para o WithdrawTransactionsController.

### Refatoracao
- trocado a importacao de varios arquivos para um unico no controlador de Deposit Transactions.
- Substituido as interfaces DTOs do useCase WithdrawTransactions para classes DTOs.
- trocado a importacao de varios arquivos para um unico no controlador de Withdraw Transactions.

<br>
<br>
<br>


## Versão 2.0.14 - 21/06/2023

### Adicionado
- Criado o controlador independente ShowUser e criado o tratamento de erros desconhecidos.
- Criado o tratamento de erro 404 no controlador ShowUser.
- Criado o protocolo do Not Found no helpers de protocols.
- Criado o protocolo do Forbidden no helpers de protocols.
- Garantindo que o controlador do ShowUser esta enviado os dados corretos.
- Garantindo que o controlador do ShowUser esta enviado os status 200 com os dados certos.
- Criado o controlador independente DepositTransactions e criado o tratamento de erros desconhecidos.
- Criado o tratamento de erro 400 no controlador DepositTransactions.
- Criado o tratamento de erro 404 no controlador DepositTransactions.
- Garantindo que o controlador do DepositTransactions esta enviado os dados corretos.
- Garantindo que o controlador do DepositTransactions esta enviado os status 200 com os dados certos.



### Refatoracao
- Melhorado os DTOs do useCaseSessions, agora o useCase recebe e  envia um novo objeto criado no formado DTOs. 
- Mudado a tipagem do user adicionando uma propriedade id do tipo number para a ide pegar melhor os valores.
- Substituido todas as importações de protocolos dos arquivos para um único arquivos chamado ShowUserControllerProtocols.
- Substituido as interfaces DTOs do useCase DepositTransactions para classes DTOs.

### Corrigido
- Arrrumado o nome da descricao do teste do controlador de amostra dos dados do usuario.

<br>
<br>
<br>

## Versão 2.0.13 - 19/06/2023

### Adicionado
- Criado o contralador de createUser e adicionado o tratamento de erro desconhecido.
- Criado o tratamento de erro 400 no controlador CreateUser.
- Criado o tratamento de erro 401 no controlador CreateUser.
- Criado o test para ver se os parametros estao sendo enviado corratamento para o useCase.
- Criado o envio da resposta de conta criada com sucesso no controlador do createUser.
- Criado o tratamento de erro 400 para username nao enviado no controlador CreateUser.
- Criado o tratamento de erro 400 para name nao enviado no controlador CreateUser.
- Criado o tratamento de erro 400 para Nascimento nao enviado no controlador CreateUser.
- Criado o tratamento de erro 400 para Tipo da conta nao enviado no controlador CreateUser.
- Criado o tratamento de erro 400 para Email nao enviado no controlador CreateUser.
- Criado o tratamento de erro 400 para Password nao enviado no controlador CreateUser.
- Criado o tratamento de erro 400 para PasswordConfirmation nao enviado no controlador CreateUser.
- Criado o tratamento de erro 400 para Cpf nao enviado no controlador CreateUser.
- Criado o primeiro contralador de SessionsUser e adicionado o tratamento de erro desconhecido.
- Criado o tratamento de erro 400 no controlador SessionsUser.
- Criado o tratamento de erro 401 no controlador SessionsUser.
- Criado o tratamento de erro 400 para username nao enviado no controlador SessionsUser.
- Criado o tratamento de erro 400 para Password nao enviado no controlador SessionsUser.
- Criado o envio de status de sucesso e envio do token no controlador SessionsUser.

### Refatoracao 
- Mudado as importacoes de varios arquivos no controlador de criacao de usuario para um unico arquivo.
- Mudados varios if com todos validacao de parametros no controlador de createUser para um array com o objeto com o param e o erro caso nao tenha.

<br>
<br>
<br>

## Versão 2.0.12 - 16/06/2023

### Adicionado
- Criado um metodo de verificar token no gerenciador de token.

### Refatoração
- Movido as importações de protocolos do useCaseCreateAccont para uma unico aqui index na pasta de protocolos.
- Movido as importações de protocolos do useCaseSessions para uma unico aqui index na pasta de protocolos.
- Movido as importações de protocolos do useCaseUserShow para uma unico aqui index na pasta de protocolos.
- Movido as importações de protocolos do useCaseCreateKey para uma unico aqui index na pasta de protocolos.
- Movido a importação de protocolos do useCaseDeleteKey para uma unico aqui index na pasta de protocolos.
- Movido a importação de protocolos do useCaseShowKey para uma unico aqui index na pasta de protocolos.
- Movido as importações de protocolos do useCaseDepositTransactions para uma unico aqui index na pasta de protocolos.
- Movido as importações de protocolos do useCaseExtractsByDataUseCase para uma unico aqui index na pasta de protocolos.
- Movido as importações de protocolos do useCaseSendingMoneyTransactions para uma unico aqui index na pasta de protocolos.
- Movido as importações de protocolos do useCaseWithdrawTransactions para uma unico aqui index na pasta de protocolos.


### Corrigido
- Arrumado a importação da configuração do jsonWebToken no middlewere de authenticação. 

<br>
<br>
<br>

## Versão 2.0.11 - 15/06/2023

### Refatoração
- Desacoplado a função de verificar idade para uma classe com uma interface IVerifyAge e invertido a dependencia.
- Desacoplado a função de validar o cpf para uma classe com uma interface IValidarCpf e invertido a dependencia.
- Mudado os arquivos de repositorio de conexao com banco de dados com knex para uma pasta a nivel mais a baixo para chamado KnexRepositories.
- Modificado o erro de cpf invalido para uma classe de InvalidCpfError.
- Excluido a função de gerar data para uma uam função propria do javascript.
- Desacoplado a função de keyGenerator para uma classe com uma interface IKeyGenerator e invertido a dependencia.
- Criado uma interface para o contador de saque por dia e substituido todos parametros para um unico objeto.
- Criado uma interface para o contador de envio para usuario por dia e substituido todos parametros para um unico objeto.
- Criado uma interface para o metodo para procurar os extratos de acordo com a data definida e substituido todos parametros para um unico objeto.
- Trocado a comparação dentro da função de somatorio de envio e saque para comparação com date-fns
- Desacoplado a função de criptografar a senha para uma classe com uma interface Codificador que tem um metodo de crptografia e invertido a dependencia.
- Desacoplado a função de comparar senha criptografada para uma classe com uma interface Codificador que tem um metodo de comparação de senha criptografada e invertido a dependencia.
- Desacoplado o objeto de configuracao de token para uma interface AuthConfigToken.
- Desacoplado a função de criar um token para uma classe com uma interface gerenciador de token que tem um metodo de criar token assim invertido a do de criar token assim invertido a dependencia.
- Mudado a jeito de testar se esta validando cpf mocando o metodo de validar e retornando o falso.

<br>
<br>
<br>

## Versão 2.0.10 - 14/06/2023

### Refatoração
- Substituido varias importação de erros do useCaseCreateUsers para um index principal
- Substituido a importação de erros do useCaseSessions para um index principal
- Substituido a importação de erros do useCaseShow para um index principal

- Substituido varias importação de erros do useCaseCreateKey para um index principal
- Substituido varias importação de erros do useCaseDelete para um index principal
- Substituido varias importação de erros do useCaseShow para um index principal

- Substituido varias importação de erros do useCaseDepositTransactions para um index principal
- Substituido varias importação de erros do useCaseSendingTransactions para um index principal
- Substituido varias importação de erros do useCaseWithdrawTransactions para um index principal

<br>
<br>
<br>

## Versão 2.0.9 - 13/06/2023

### Adicionado
- Adicionado de erro de recurso não encontrado no UseCaseDeposit
- Adicionado de erro de recurso não encontrado no UseCaseSending

### Refatoração
- Mudado o erro de Resource not Found que foi criado com AppError no WithdrawUseCase para a classe Resource not Found
- Mudado a implementação do useCase Sessions para implementar o IUseCaseSessions tornando mais legivel e tipado.
- Mudado a implementação do useCase Show para implementar o IUseCaseShow tornando mais legivel e tipado.
- Mudado a implementação do useCase CreateKey para implementar o IUseCaseCreateKey tornando mais legivel e tipado.
- Mudado a implementação do useCase deleteKey para implementar o IUseCaseDeleteKey tornando mais legivel e tipado.
- Mudado a implementação do useCase ShowKey para implementar o IUseCaseShowKey tornando mais legivel e tipado.
- Mudado a implementação do useCase DepositTransactions para implementar o IUseCaseDepositTransactions tornando mais legivel e tipado.
- Mudado a implementação do useCase ExtractsByDate para implementar o IUseCaseExtractsByDate tornando mais legivel e tipado.
- Mudado a implementação do useCase SendingMoneyTransactions para implementar o IUseCase SendingMoneyTransactions tornando mais legivel e tipado.
- Mudado a implementação do useCase WithdrawTransactions para implementar o IUseCase tornando mais legivel e tipado.


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

### Refatoração
- Alterado um erros globais sobre ```conta ja existente``` criado com o AppError para um erro especifico a onde vai facilitar a leitura.
- Alterado o erro de ```senhas direntes``` criado com o AppError para um erro criado com uma classe com seu nome para maior facilidade de entendimento na hora da manutenção.  
- Alterado o erro de ```senha ou username invalidos``` criado com o AppError para um erro criado com uma classe do nome do erro para maior entendimento e facilidade na hora da manutenção.  
- Alterado o erro ```Chave ja existente``` criado com o AppError para um erro criado com uma classe do nome do erro para maior entendimento e facilidade na hora da manutenção.  
- Alterado o erro ```Chave não Existe``` criado com o AppError para um erro criado com uma classe do nome do erro para maior entendimento e facilidade na hora da manutenção.  
- Alterado o erro ```Valor Invalido``` criado com o AppError para um erro criado com uma classe do nome do erro para maior entendimento e facilidade na hora da manutenção.  
- Alterado o erro ```Saldo Insuficiente``` criado com o AppError para um erro criado com uma classe do nome do erro para maior entendimento e facilidade na hora da manutenção.  
- Alterado o erro ```Chave Pix Inválida``` criado com o AppError para um erro criado com uma classe do nome do erro para maior entendimento e facilidade na hora da manutenção.  
- Alterado o erro ```Voce não pode enviar dinheiro para voce``` criado com o AppError para um erro criado com uma classe do nome do erro para maior entendimento e facilidade na hora da manutenção.  
- Alterado o erro ```Token não recebido``` criado com o AppError para um erro criado com uma classe do nome do erro para maior entendimento e facilidade na hora da manutenção.  
- Alterado o erro ```Usuario menor de idade``` criado com o AppError para um erro criado com uma classe do nome do erro para maior entendimento e facilidade na hora da manutenção.  


<br>
<br>
<br>

## Versão 2.0.7 - 05/06/2023

### Adicionado
- Dentro do app na captura de erros foi adicionado a captura de erros que sao filhos do AppError para criacao de erros especificos na facilitacao de leitura dos erros.
- Interfaces novas para o CreateUserUseCase sendo elas o ICreateReponseDTO e o ICreateUserUseCase para implementação do useCase.
- Criado um erro especifico para recurso não encontrado. 
- Criado um erro especifico para usuario não authorizado.
- Criado um erro especifico de limite diario.
- Criado um erro especifico de limite.
- Verificacao do useCaseSendingMoney a onde o usuario com o tipo de conta poupanca so pode sacar ate 1500 por dia no envio de dinheiro.
- Verificacao do useCaseSendingMoney a onde o usuario com o tipo de conta corrente so pode sacar ate 4000 por dia no envio de dinheiro.
- Verificacao do useCaseSendingMoney a onde o usuario com o tipo de conta universitaria so pode sacar ate 2250 por dia no envio de dinheiro.

### Alterado 
- Alterado o nome da classe de erro de recurso não encontrado para ResourceNotFoundError para ficar um nome mais claro dizendo que aquela classe é sobre um erro.
- tirado os try catchs do useCase e agora e so ficara no controller para pegar erros desconhecidos.

### Refatoração
- Tirado o CreateUserUseCase do CreateUserController para colocar a interface do UseCase assim ele não tera ligacao direta com o useCase.
- Adicionado o ResourceNotFound para padrazinhacao do erro no  ShowUseCase.
- Refatoracao feita no useCase de Saque para ter um array com os limites de saque verificar se o usuario atingiu o seu limite de acordo com o array.
- Refatoracao feita no useCase de Saque para ter um array com os limites de saque verificar se o usuario atingiu o seu limite diario de acordo com o array.
- Refatoracao feita no useCase De envio para ter somente um array com os limites de cada tipo usado um for para percorrer o array e verificar se o usuario esta envia um valor maior que seu limite. 

<br>
<br>
<br>

## Versão 2.0.6 - 01/06/2023

### Adicionado
- Adicionado uma configuracao de banco de dados docker-compose para no futuro fazer os testes E2E por motivos do postgres ter os schemas dentro dele e pode criar e deletar varios.


### Refactoracao
- Refatorado todos os testes adicionado e aplicando o pattern Sut para não ter que instanciar tudo e ficar claro de quem esta sendo testado naquele switch de teste.

### Corrigido
- Corrigido um erro que não estava previsto no teste do useCase dos Extratos com data inicial e final. Esse erro ocorria porque o array estava sendo retornado sem a devida filtragem das datas, resultando em um array vazio. <br>
Melhorei a lógica utilizando a biblioteca date-fns para realizar comparações precisas com as funções isAfter, isBefore e isEqual. Também adicionei um teste com mocks, criando uma data fora do intervalo para verificar se ela está sendo excluída corretamente. Além disso, criei 5 datas dentro do intervalo especificado.


<br>
<br>
<br>


## Versão 2.0.5 - 30/05/2023
### Alterado
- Mudado o useCaseWithdraw colocando um limite diario de saque para contas corrente de 4000.
- Mudado o useCaseWithdraw colocando um limite diario de saque para contas universitaria de 2250.

### Adicionado 
- Adicionado uma função para retornar o valor total de saque do usuario naquele dia.
- Adicionado uma função para retornar o valor total de envio do usuario naquele dia.

<br>
<br>
<br>

## Versão 2.0.4 - 25/05/2023
### Alterado
- Mudado o useCaseSendingMoney colocando um limite  de envio de R$300 para contas poupancas.
- Mudado o useCaseSendingMoney colocando um limite  de envio de R$800 para contas correntes.
- Mudado o useCaseSendingMoney colocando um limite  de envio de R$450 para contas universitarias.

<br>
<br>
<br>

## Versão 2.0.3 - 24/05/2023

### Adicionado 
- Criado a documentação  da rota show keypix.
- Criado a documentação  da rota create keypix.
- Criado a documentação da rota delete keypix.

### Alterado
- Mudado o useCaseWithdraw colocando um limite de R$300 por saque para contas do tipo poupanca.
- Mudado o useCaseWithdraw colocando um limite de R$800 por saque para contas do tipo corrente.
- Mudado o useCaseWithdraw colocando um limite de R$450 por saque para contas do tipo universitaria.

<br>
<br>
<br>

## Versão 2.0.2 - 23/05/2023
### Adicionado
- Criado a documentação da rota show user.
- Criado a documentação da rota sessions user.
- Criado a documentação da rota de sendingMoney.
- Criado a documentação da rota de extractsByDate.
- Criado a documentação da rota de deposit.
- Criado a documentação da rota de withdraw.

<br>
<br>
<br>

## Versão 2.0.1 - 22/05/2023
### Adicionado
- Dependencia vitest ui para visualizacao para mais uma opcao de visualizacao dos testes.
- Criado a documentação da rota de criar um novo usuario.

### Alterado
- Trocado a rota de login que estava na localhost:8888/users para localhost:8888/users/sessions.
- Trocado o jeito de conseguir a requisicao do extracts show que estava no body para query.
### Corrigido
- Concertado o bug que estava acontecendo de os testes pararem depois que tudo desse sucesso mesmo no modo de watch.

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
- Adicionado uma verificao no envio de dinheiro para usuario não enviar dinheiro negativo.
- Criacao dos testes do UseCase SendingMoney e Testes Executados com status de sucesso.
- Criacao dos testes do UseCase WithdrawMoney e Testes Executados com status de sucesso.