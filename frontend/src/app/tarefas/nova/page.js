"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NovaTarefa() {
  const router = useRouter();

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [prioridade, setPrioridade] = useState("");
  const [situacao, setSituacao] = useState("");

  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  async function salvarTarefa(event) {
    event.preventDefault();

    try {
      setSalvando(true);
      setErro("");

      const resposta = await fetch("http://localhost:3001/tarefas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titulo,
          descricao,
          prioridade,
          situacao,
        }),
      });

      if (!resposta.ok) {
        const dadosErro = await resposta.json();

        throw new Error(dadosErro.mensagem || "Erro ao cadastrar tarefa");
      }

      router.push("/");
    } catch (error) {
      console.error(error);

      setErro(error.message);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <>
      <header className="taskflow-navbar py-3">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="taskflow-logo text-white">
            Task<span>Flow</span>
          </div>

          <button className="btn text-white fs-4">☰</button>
        </div>
      </header>

      <main className="container py-5">
        <Link href="/" className="text-decoration-none">
          ← Voltar para tarefas
        </Link>

        <div className="mt-3">
          <h1 className="fw-bold mb-1">Nova tarefa</h1>

          <p className="text-secondary">
            Preencha os campos abaixo para criar uma nova tarefa.
          </p>
        </div>

        {erro && <div className="alert alert-danger mt-4">{erro}</div>}

        <form onSubmit={salvarTarefa}>
          <div className="mt-4">
            <label htmlFor="titulo" className="form-label fw-semibold">
              Título <span className="text-danger">*</span>
            </label>

            <input
              id="titulo"
              type="text"
              className="form-control"
              placeholder="Digite o título da tarefa"
              value={titulo}
              onChange={(event) => setTitulo(event.target.value)}
              required
            />
          </div>

          <div className="mt-4">
            <label htmlFor="descricao" className="form-label fw-semibold">
              Descrição
            </label>

            <textarea
              id="descricao"
              className="form-control"
              rows="4"
              placeholder="Digite a descrição da tarefa"
              value={descricao}
              onChange={(event) => setDescricao(event.target.value)}
            ></textarea>
          </div>

          <div className="row mt-4">
            <div className="col-md-6">
              <label htmlFor="prioridade" className="form-label fw-semibold">
                Prioridade <span className="text-danger">*</span>
              </label>

              <select
                id="prioridade"
                className="form-select"
                value={prioridade}
                onChange={(event) => setPrioridade(event.target.value)}
                required
              >
                <option value="">Selecione a prioridade</option>

                <option value="Alta">Alta</option>

                <option value="Média">Média</option>

                <option value="Baixa">Baixa</option>
              </select>
            </div>

            <div className="col-md-6">
              <label htmlFor="situacao" className="form-label fw-semibold">
                Situação <span className="text-danger">*</span>
              </label>

              <select
                id="situacao"
                className="form-select"
                value={situacao}
                onChange={(event) => setSituacao(event.target.value)}
                required
              >
                <option value="">Selecione a situação</option>

                <option value="Pendente">Pendente</option>

                <option value="Em andamento">Em andamento</option>

                <option value="Concluída">Concluída</option>
              </select>
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <Link href="/" className="btn btn-secondary">
              Cancelar
            </Link>

            <button type="submit" className="btn btn-primary" disabled={salvando}>
              {salvando ? "Salvando..." : "Salvar tarefa"}
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
