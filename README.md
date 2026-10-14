# TaskFlow

O **TaskFlow** é uma aplicação web para gerenciamento de tarefas, desenvolvida como projeto individual da disciplina **Programação Front-End 01**.

A aplicação permite organizar e acompanhar tarefas por meio de uma interface simples, utilizando **Next.js no front-end** e uma **API Node.js com Express no back-end**.

---

## Objetivo

O objetivo do TaskFlow é permitir que o usuário organize suas atividades de forma simples, podendo:

- cadastrar tarefas;
- visualizar tarefas cadastradas;
- pesquisar tarefas;
- editar informações;
- excluir tarefas;
- acompanhar a prioridade;
- acompanhar a situação de cada tarefa.

---

## Usuário principal

O usuário principal é uma pessoa que deseja organizar suas tarefas e acompanhar o andamento de suas atividades.

---

## Dados gerenciados

Cada tarefa possui as seguintes informações:

- **Título**
- **Descrição**
- **Prioridade**
  - Alta
  - Média
  - Baixa
- **Situação**
  - Pendente
  - Em andamento
  - Concluída

---

## Tecnologias utilizadas

### Front-end

- Next.js
- React
- JavaScript
- Bootstrap
- App Router

### Back-end

- Node.js
- Express
- CORS

### Versionamento

- Git
- GitHub

---

## Estrutura do projeto

```text
PFEND1-AV-INDIVIDUAL/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── docs/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   │   ├── tarefas/
│   │   │   │   ├── editar/
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── page.js
│   │   │   │   └── nova/
│   │   │   │       └── page.js
│   │   │   ├── globals.css
│   │   │   ├── layout.js
│   │   │   └── page.js
│   │   │
│   │   └── components/
│   │       └── Header.js
│   │
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md
```

---

## Funcionalidades

### Listagem de tarefas

A página principal apresenta todas as tarefas cadastradas.

Cada tarefa apresenta:

- título;
- prioridade;
- situação;
- botão para editar;
- botão para excluir.

---

### Busca

O usuário pode pesquisar tarefas pelo título utilizando o campo:

```text
Buscar tarefa...
```

Caso nenhuma tarefa seja encontrada, a aplicação apresenta uma mensagem informando que não existem resultados.

---

### Cadastro

O usuário pode criar uma nova tarefa por meio do botão:

```text
+ Nova tarefa
```

Os campos obrigatórios são:

- título;
- prioridade;
- situação.

Após o cadastro, a aplicação apresenta a mensagem:

```text
Tarefa cadastrada com sucesso.
```

---

### Edição

O usuário pode alterar os dados de uma tarefa existente.

Após a atualização, a aplicação apresenta a mensagem:

```text
Tarefa atualizada com sucesso.
```

---

### Exclusão

Antes de excluir uma tarefa, a aplicação apresenta uma janela de confirmação.

O usuário pode:

- cancelar a exclusão;
- confirmar a exclusão.

Após a exclusão, a aplicação apresenta:

```text
Tarefa excluída com sucesso.
```

---

## Tratamento de erros

A aplicação também trata situações de erro.

Por exemplo, ao tentar editar uma tarefa inexistente, é exibida a mensagem:

```text
Tarefa não encontrada
```

O formulário de edição não é apresentado nesse caso.

---

## Responsividade

O TaskFlow foi desenvolvido para funcionar tanto em computadores quanto em dispositivos móveis.

### Computador

Em telas maiores, as tarefas são apresentadas em uma tabela.

### Celular

Em telas menores, as tarefas são apresentadas em cards responsivos.

Os cards permitem visualizar:

- título;
- prioridade;
- situação;
- botão Editar;
- botão Excluir.

Os formulários de cadastro e edição também se adaptam ao tamanho da tela.

---

## Funcionamento da API

O front-end consome uma API Express disponível em:

```text
http://localhost:3001
```

### Rotas

```text
GET    /tarefas
GET    /tarefas/:id
POST   /tarefas
PUT    /tarefas/:id
DELETE /tarefas/:id
```

### GET /tarefas

Retorna todas as tarefas.

### GET /tarefas/:id

Retorna uma tarefa específica.

### POST /tarefas

Cria uma nova tarefa.

### PUT /tarefas/:id

Atualiza uma tarefa existente.

### DELETE /tarefas/:id

Exclui uma tarefa.

---

## Armazenamento dos dados

Os dados são armazenados em um **array no back-end**.

Isso significa que os dados ficam disponíveis enquanto o servidor estiver funcionando.

Ao reiniciar a API, as tarefas retornam ao estado inicial.

Não é utilizado banco de dados neste projeto.

---

# Como executar o projeto

## 1. Clonar o repositório

```bash
git clone https://github.com/Luiz-sourceDev/PFEND1-AV-INDIVIDUAL.git
```

Entre na pasta:

```bash
cd PFEND1-AV-INDIVIDUAL
```

---

## 2. Executar o back-end

Entre na pasta:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

No PowerShell do Windows também pode ser utilizado:

```powershell
npm.cmd install
```

Inicie a API:

```bash
npm start
```

Ou:

```powershell
npm.cmd start
```

O servidor será iniciado em:

```text
http://localhost:3001
```

Para testar diretamente a listagem da API:

```text
http://localhost:3001/tarefas
```

---

## 3. Executar o front-end

Abra outro terminal.

A partir da raiz do projeto:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

No PowerShell:

```powershell
npm.cmd install
```

Execute o Next.js:

```bash
npm run dev
```

No PowerShell:

```powershell
npm.cmd run dev
```

A aplicação ficará disponível em:

```text
http://localhost:3000
```

---

# Ambiente de desenvolvimento

Durante o desenvolvimento são utilizados dois terminais.

### Terminal 1

Back-end:

```text
http://localhost:3001
```

### Terminal 2

Front-end:

```text
http://localhost:3000
```

---

# Testes realizados

Durante o desenvolvimento foram testados:

- inicialização do back-end;
- inicialização do front-end;
- integração entre Next.js e Express;
- listagem de tarefas;
- busca por título;
- cadastro;
- edição;
- cancelamento da edição;
- exclusão;
- cancelamento da exclusão;
- tratamento de tarefa inexistente;
- reinicialização da API;
- mensagens de sucesso;
- mensagens de erro;
- funcionamento em tela de computador;
- funcionamento em tela de celular;
- console do navegador;
- terminais do front-end e back-end.

---

# Fluxo principal da aplicação

```text
Usuário
   ↓
Next.js
   ↓
Fetch
   ↓
API Express
   ↓
Array de tarefas
```

O Next.js é responsável pela interface apresentada ao usuário.

A API Express é responsável por receber as requisições e realizar as operações de cadastro, consulta, atualização e exclusão.

---

# CRUD

O projeto implementa as quatro operações principais de gerenciamento de registros:

```text
CREATE → POST
READ   → GET
UPDATE → PUT
DELETE → DELETE
```

---

# Projeto acadêmico

Projeto desenvolvido para a disciplina:

**Programação Front-End 01**

Tema:

**Gerenciador operacional de tarefas**

Projeto individual.

---

## Autor

**Luiz Reis**