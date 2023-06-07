</p>
<h4 align="center"> 
	🚧 Api Hzhong 🚧
</h4>

<p align="center">
	<img alt="Status Em Desenvolvimento" src="https://img.shields.io/badge/STATUS-EM%20DESENVOLVIMENTO-green">
</p>

<p align="center">
 <a href="#-sobre-o-projeto">Sobre</a> •
 <a href="#-funcionalidades">Funcionalidades</a> •
 <a href="#-arquitetura">Arquitetura</a> • 
 <a href="#-como-executar-o-projeto">Como executar</a> • 
 <a href="#-tecnologias">Tecnologias</a> • 
 <a href="#-autora">Autora</a> • 
 <a href="#user-content--licença">Licença</a>
</p>


## 💻 Sobre o projeto
Api para o banco hzhong a onde usuário poderar gerenciar suas financias e fazer pagamentos. <br>
Hzhong o banco que facilita sua vida.

---

## ⚙️ Funcionalidades

- Criar Conta:
  - Entidades:
    - Usuário.
- Fazer login:
  - Entidades:
    - Usuário.
- Monstrar Infos do usuario:
  - Entidades:
    - Usuário.
    - Extrato.
- Sacar dinheiro:
  - Entidades:
    - Usuário.
    - Extrato.
- Transferir dinheiro:
  - Entidades:
    - Usuário.
    - Extrato.
- Depositar dinheiro:
  - Entidades:
    - Usuário.
    - Extrato.
- Monstrar Extrato:
  - Entidades:
    - Usuário.
    - Extrato.

---

## 📉 Arquitetura

<br>
<a href="https://i.imgur.com/eNVnF2e.png">
  <img alt="Arquitetura feita pela Amandalfs" src="https://i.imgur.com/eNVnF2e.png">
</a>

<br>

---
## 🛣️ Como executar o projeto

Esse Api precisa de alguns pré-requisitos para funcionar direito.

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), [Docker]().
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

#### 🎲 Rodando a api HZhong

```bash

# Clone este repositório
$ git clone git@github.com:Amandalfs/CRUD-bancoHzhong.git

# Acesse a pasta do projeto no terminal/cmd
$ cd CRUD-BANCOHZHONG

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

## Obs:
Ela vai rodar o banco de dados sqlite mas que tu quiser rodar em ambiente de producao ou teste vai ter que precisar rodar o docker para criar o banco de dados postgres pelo fato de ter varios schemas no postgres, assim facilitando os testes intregados e E2E.

# O servidor inciará na porta:8020 - acesse http://localhost:8020 

```
#### 🎲 Rodando os testes

```bash

# Clone este repositório
$ git clone git@github.com:Amandalfs/CRUD-bancoHzhong.git

# Acesse a pasta do projeto no terminal/cmd
$ cd CRUD-BANCOHZHONG

# Instale as dependências
$ npm install

# Execute os testes unitarios
$ npm run test

# Execute os testes unitarios e ficar executando os testes unitarios a cada vez que tem uma modificacao.
$ npm run test:watch

# Execute os testes unitarios e gerar os graficos dele
$ npm run test:ui

```

<br>

---

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

#### []()**Api**  ([NodeJS](https://nodejs.org/en/)  +  [TypeScript](https://www.typescriptlang.org/))

-   **[Express](https://expressjs.com/)**
-   **[CORS](https://expressjs.com/en/resources/middleware/cors.html)**
-   **[KnexJS](http://knexjs.org/)**
-   **[pg](https://github.com/motdotla/dotenv)**
-   **[tsx](https://github.com/TypeStrong/ts-node)**
-   **[dotENV](https://github.com/motdotla/dotenv)**
-   **[zod]()**
-   **[supertest]()**
-   **[vitest]()**
-   **[jsonwebtoken]()**
-   **[datefns]()**
-   **[swagger-ui-express]()**
-   **[jsonwebtoken]()**

> Veja o arquivo  [package.json](https://github.com/Amandalfs/CRUD-bancoHzhong/blob/main/package.json)

## 🛠 Patterns e Conceitos usado no projeto.
- Sut
- Repositories
- SOLID 

---

<br>

## 🧙‍♀️ Autora

<a href="https://www.linkedin.com/in/amanda-rodrigues%F0%9F%8F%B3%EF%B8%8F%E2%80%8D%E2%9A%A7%EF%B8%8F-a92271166/">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/65101161?v=4" width="100px;" alt=""/>
 <br />
 <sub><b>Amanda Rodrigues</b></sub></a>✨</a>
 <br />

---

## 📝 Licença

<!-- Este projeto esta sobe a licença [MIT](./LICENSE). -->

Feito com ❤️ por Amanda Rodrigues [Entre em contato!](https://www.linkedin.com/in/amanda-rodrigues%F0%9F%8F%B3%EF%B8%8F%E2%80%8D%E2%9A%A7%EF%B8%8F-a92271166/)
