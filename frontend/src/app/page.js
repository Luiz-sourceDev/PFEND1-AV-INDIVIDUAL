"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";

export default function Home() {
  const [tarefas, setTarefas] = useState([]);
  const [tarefaSelecionada, setTarefaSelecionada] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [excluindo, setExcluindo] = useState(false);
  const [erro, setErro] = useState("");
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [busca, setBusca] = useState("");

  useEffect(() => {
    buscarTarefas();

    const mensagem = sessionStorage.getItem("mensagemSucesso");

    if (mensagem) {
      setMensagemSucesso(mensagem);
      sessionStorage.removeItem("mensagemSucesso");
    }
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
      setMensagemSucesso("");

      const resposta = await fetch(
        `http://localhost:3001/tarefas/${tarefaSelecionada.id}`,
        {
          method: "DELETE",
        }
      );

      if (!resposta.ok) {
        const dadosErro = await resposta.json();

        throw new Error(
          dadosErro.mensagem || "Erro ao excluir tarefa"
        );
      }

      setTarefaSelecionada(null);

      await buscarTarefas();

      setMensagemSucesso("Tarefa excluída com sucesso.");
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
    tarefa.titulo
      .toLowerCase()
      .includes(busca.toLowerCase())
  );

  return (
    <>
      <Header />

      <main className="container py-4 py-md-5">
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3">
          <div>
            <h1 className="fw-bold mb-1">
              Minhas tarefas
            </h1>

            <p className="text-secondary mb-0">
              Organize e acompanhe suas atividades.
            </p>
          </div>

          <Link
            href="/tarefas/nova"
            className="btn btn-primary align-self-start align-self-sm-auto"
          >
            + Nova tarefa
          </Link>
        </div>

        {mensagemSucesso && (
          <div
            className="alert alert-success alert-dismissible fade show mt-4"
            role="alert"
          >
            {mensagemSucesso}

            <button
              type="button"
              className="btn-close"
              aria-label="Fechar"
              onClick={() => setMensagemSucesso("")}
            ></button>
          </div>
        )}

        {erro && (
          <div className="alert alert-danger mt-4">
            {erro}
          </div>
        )}

        <div className="mt-4">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar tarefa..."
            value={busca}
            onChange={(event) =>
              setBusca(event.target.value)
            }
          />
        </div>

        <div className="mt-4">
          {carregando && (
            <div className="bg-white rounded shadow-sm p-3">
              <p className="text-secondary mb-0">
                Carregando tarefas...
              </p>
            </div>
          )}

          {!carregando && !erro && tarefasFiltradas.length === 0 && (
            <div className="bg-white rounded shadow-sm p-4 text-center text-secondary">
              Nenhuma tarefa encontrada.
            </div>
          )}

          {!carregando && !erro && tarefasFiltradas.length > 0 && (
            <>
              {/* VISUALIZAÇÃO PARA COMPUTADOR */}
              <div className="d-none d-md-block bg-white rounded shadow-sm p-3">
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
                      {tarefasFiltradas.map((tarefa) => (
                        <tr key={tarefa.id}>
                          <td>{tarefa.id}</td>

                          <td>{tarefa.titulo}</td>

                          <td>
                            <span
                              className={classePrioridade(
                                tarefa.prioridade
                              )}
                            >
                              {tarefa.prioridade}
                            </span>
                          </td>

                          <td>
                            <span
                              className={classeSituacao(
                                tarefa.situacao
                              )}
                            >
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
                              onClick={() =>
                                setTarefaSelecionada(tarefa)
                              }
                            >
                              Excluir
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* VISUALIZAÇÃO PARA CELULAR */}
              <div className="d-md-none">
                {tarefasFiltradas.map((tarefa) => (
                  <div
                    key={tarefa.id}
                    className="card shadow-sm mb-3"
                  >
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start gap-2">
                        <div>
                          <small className="text-secondary">
                            Tarefa #{tarefa.id}
                          </small>

                          <h5 className="card-title fw-bold mt-1 mb-0">
                            {tarefa.titulo}
                          </h5>
                        </div>
                      </div>

                      <div className="mt-3">
                        <p className="mb-2">
                          <strong>Prioridade:</strong>{" "}
                          <span
                            className={classePrioridade(
                              tarefa.prioridade
                            )}
                          >
                            {tarefa.prioridade}
                          </span>
                        </p>

                        <p className="mb-0">
                          <strong>Situação:</strong>{" "}
                          <span
                            className={classeSituacao(
                              tarefa.situacao
                            )}
                          >
                            {tarefa.situacao}
                          </span>
                        </p>
                      </div>

                      <div className="d-flex gap-2 mt-4">
                        <Link
                          href={`/tarefas/editar/${tarefa.id}`}
                          className="btn btn-outline-primary flex-fill"
                        >
                          Editar
                        </Link>

                        <button
                          className="btn btn-outline-danger flex-fill"
                          onClick={() =>
                            setTarefaSelecionada(tarefa)
                          }
                        >
                          Excluir
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      {tarefaSelecionada && (
        <>
          <div
            className="modal show d-block"
            tabIndex="-1"
            role="dialog"
            aria-modal="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title fw-bold">
                    Excluir tarefa
                  </h5>
                </div>

                <div className="modal-body">
                  <p className="mb-2">
                    Tem certeza que deseja excluir a tarefa{" "}
                    <strong>
                      {tarefaSelecionada.titulo}
                    </strong>
                    ?
                  </p>

                  <p className="text-secondary mb-0">
                    Esta ação não poderá ser desfeita.
                  </p>
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() =>
                      setTarefaSelecionada(null)
                    }
                    disabled={excluindo}
                  >
                    Cancelar
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={excluirTarefa}
                    disabled={excluindo}
                  >
                    {excluindo
                      ? "Excluindo..."
                      : "Excluir"}
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