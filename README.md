# TaskFlow

O **TaskFlow** é uma aplicação web para gerenciamento de tarefas, desenvolvida como projeto individual da disciplina **Programação Front-End 01**.

A aplicação permite organizar e acompanhar tarefas por meio de uma interface simples e responsiva, utilizando **Next.js no front-end** e uma **API Node.js com Express no back-end**.

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
- JavaScript / JSX
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
│   │
│   ├── src/
│   │   ├── app/
│   │   │   ├── tarefas/
│   │   │   │   ├── editar/
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── page.jsx
│   │   │   │   └── nova/
│   │   │   │       └── page.jsx
│   │   │   │
│   │   │   ├── globals.css
│   │   │   ├── icon.png
│   │   │   ├── layout.jsx
│   │   │   └── page.jsx
│   │   │
│   │   └── components/
│   │       └── Header.jsx
│   │
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md
```
