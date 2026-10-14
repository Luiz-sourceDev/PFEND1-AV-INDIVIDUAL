const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 3001;

app.use(cors());
app.use(express.json());

const tarefas = [
  {
    id: 1,
    titulo: "Estudar integração com API",
    descricao: "Revisar rotas e testes da API",
    prioridade: "Alta",
    situacao: "Em andamento",
  },
  {
    id: 2,
    titulo: "Finalizar projeto",
    descricao: "Finalizar o projeto avaliativo",
    prioridade: "Média",
    situacao: "Pendente",
  },
  {
    id: 3,
    titulo: "Revisar React",
    descricao: "Revisar os principais conceitos de React",
    prioridade: "Baixa",
    situacao: "Concluída",
  },
];

let proximoId = 4;

// Rota principal
app.get("/", (req, res) => {
  res.send("API TaskFlow funcionando");
});

// Listar todas as tarefas
app.get("/tarefas", (req, res) => {
  res.json(tarefas);
});

// Buscar uma tarefa pelo ID
app.get("/tarefas/:id", (req, res) => {
  const id = Number(req.params.id);

  const tarefa = tarefas.find((tarefa) => tarefa.id === id);

  if (!tarefa) {
    return res.status(404).json({
      mensagem: "Tarefa não encontrada",
    });
  }

  res.json(tarefa);
});

// Cadastrar uma nova tarefa
app.post("/tarefas", (req, res) => {
  const { titulo, descricao, prioridade, situacao } = req.body;

  if (!titulo || !prioridade || !situacao) {
    return res.status(400).json({
      mensagem: "Título, prioridade e situação são obrigatórios",
    });
  }

  const novaTarefa = {
    id: proximoId,
    titulo,
    descricao: descricao || "",
    prioridade,
    situacao,
  };

  tarefas.push(novaTarefa);

  proximoId++;

  res.status(201).json(novaTarefa);
});

// Atualizar uma tarefa pelo ID
app.put("/tarefas/:id", (req, res) => {
  const id = Number(req.params.id);

  const tarefa = tarefas.find((tarefa) => tarefa.id === id);

  if (!tarefa) {
    return res.status(404).json({
      mensagem: "Tarefa não encontrada",
    });
  }

  const { titulo, descricao, prioridade, situacao } = req.body;

  if (!titulo || !prioridade || !situacao) {
    return res.status(400).json({
      mensagem: "Título, prioridade e situação são obrigatórios",
    });
  }

  tarefa.titulo = titulo;
  tarefa.descricao = descricao || "";
  tarefa.prioridade = prioridade;
  tarefa.situacao = situacao;

  res.json(tarefa);
});

// Excluir uma tarefa pelo ID
app.delete("/tarefas/:id", (req, res) => {
  const id = Number(req.params.id);

  const indice = tarefas.findIndex((tarefa) => tarefa.id === id);

  if (indice === -1) {
    return res.status(404).json({
      mensagem: "Tarefa não encontrada",
    });
  }

  const tarefaExcluida = tarefas.splice(indice, 1);

  res.json({
    mensagem: "Tarefa excluída com sucesso",
    tarefa: tarefaExcluida[0],
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
