"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [tarefas, setTarefas] = useState([]);
  const [tarefaSelecionada, setTarefaSelecionada] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [excluindo, setExcluindo] = useState(false);
  const [erro, setErro] = useState("");
  const [busca, setBusca] = useState("");

  useEffect(() => {
    buscarTarefas();
  }, []);

  async function buscarTarefas() {
    try {
      setCarregando(true);

      const resposta = await fetch("http://localhost:3001/tarefas");

      if (!resposta.ok) {
        throw new Error("Erro ao buscar tarefas");
      }

      const dados = await resposta.json();

      setTarefas(dados);
      setErro("");
    } catch (error) {
      console.error(error);
      setErro("Não foi possível carregar as tarefas.");
    } finally {
      setCarregando(false);
    }
  }

  async function excluirTarefa() {
    if (!tarefaSelecionada) {
      return;
    }

    try {
      setExcluindo(true);
      setErro("");

      const resposta = await fetch(
        `http://localhost:3001/tarefas/${tarefaSelecionada.id}`,
        {
          method: "DELETE",
        }
      );

      if (!resposta.ok) {
        const dadosErro = await resposta.json();

        throw new Error(dadosErro.mensagem || "Erro ao excluir tarefa");
      }

      setTarefaSelecionada(null);

      await buscarTarefas();
    } catch (error) {
      console.error(error);
      setErro(error.message);
    } finally {
      setExcluindo(false);
    }
  }

  function classePrioridade(prioridade) {
    if (prioridade === "Alta") {
      return "badge text-bg-danger";
    }

    if (prioridade === "Média") {
      return "badge text-bg-warning";
    }

    return "badge text-bg-primary";
  }

  function classeSituacao(situacao) {
    if (situacao === "Concluída") {
      return "badge text-bg-success";
    }

    if (situacao === "Pendente") {
      return "badge badge-pendente";
    }

    return "badge text-bg-primary";
  }

  const tarefasFiltradas = tarefas.filter((tarefa) =>
    tarefa.titulo.toLowerCase().includes(busca.toLowerCase())
  );

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
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h1 className="fw-bold mb-1">Minhas tarefas</h1>

            <p className="text-secondary mb-0">Organize e acompanhe suas atividades.</p>
          </div>

          <Link href="/tarefas/nova" className="btn btn-primary">
            + Nova tarefa
          </Link>
        </div>

        <div className="mt-4">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar tarefa..."
            value={busca}
            onChange={(event) => setBusca(event.target.value)}
          />
        </div>

        <div className="mt-4 bg-white rounded shadow-sm p-3">
          {carregando && <p className="text-secondary mb-0">Carregando tarefas...</p>}

          {erro && <div className="alert alert-danger mb-0">{erro}</div>}

          {!carregando && !erro && (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Título</th>
                    <th>Prioridade</th>
                    <th>Situação</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {tarefasFiltradas.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center text-secondary py-4">
                        Nenhuma tarefa encontrada.
                      </td>
                    </tr>
                  ) : (
                    tarefasFiltradas.map((tarefa) => (
                      <tr key={tarefa.id}>
                        <td>{tarefa.id}</td>

                        <td>{tarefa.titulo}</td>

                        <td>
                          <span className={classePrioridade(tarefa.prioridade)}>
                            {tarefa.prioridade}
                          </span>
                        </td>

                        <td>
                          <span className={classeSituacao(tarefa.situacao)}>
                            {tarefa.situacao}
                          </span>
                        </td>

                        <td>
                          <Link
                            href={`/tarefas/editar/${tarefa.id}`}
                            className="btn btn-sm btn-outline-primary me-2"
                          >
                            Editar
                          </Link>

                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => setTarefaSelecionada(tarefa)}
                          >
                            Excluir
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {tarefaSelecionada && (
        <>
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title fw-bold">Excluir tarefa</h5>
                </div>

                <div className="modal-body">
                  <p className="mb-2">
                    Tem certeza que deseja excluir a tarefa{" "}
                    <strong>{tarefaSelecionada.titulo}</strong>?
                  </p>

                  <p className="text-secondary mb-0">
                    Esta ação não poderá ser desfeita.
                  </p>
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setTarefaSelecionada(null)}
                    disabled={excluindo}
                  >
                    Cancelar
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={excluirTarefa}
                    disabled={excluindo}
                  >
                    {excluindo ? "Excluindo..." : "Excluir"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-backdrop show"></div>
        </>
      )}
    </>
  );
}
