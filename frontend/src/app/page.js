"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [tarefaSelecionada, setTarefaSelecionada] = useState(null);

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
          <input type="text" className="form-control" placeholder="Buscar tarefa..." />
        </div>

        <div className="mt-4 bg-white rounded shadow-sm p-3">
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
                <tr>
                  <td>1</td>

                  <td>Estudar API</td>

                  <td>
                    <span className="badge text-bg-danger">Alta</span>
                  </td>

                  <td>
                    <span className="badge text-bg-primary">Em andamento</span>
                  </td>

                  <td>
                    <Link
                      href="/tarefas/editar/1"
                      className="btn btn-sm btn-outline-primary me-2"
                    >
                      Editar
                    </Link>

                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() =>
                        setTarefaSelecionada({
                          id: 1,
                          titulo: "Estudar API",
                        })
                      }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>

                <tr>
                  <td>2</td>

                  <td>Finalizar projeto</td>

                  <td>
                    <span className="badge text-bg-warning">Média</span>
                  </td>

                  <td>
                    <span className="badge badge-pendente">Pendente</span>
                  </td>

                  <td>
                    <Link
                      href="/tarefas/editar/2"
                      className="btn btn-sm btn-outline-primary me-2"
                    >
                      Editar
                    </Link>

                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() =>
                        setTarefaSelecionada({
                          id: 2,
                          titulo: "Finalizar projeto",
                        })
                      }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>

                <tr>
                  <td>3</td>

                  <td>Revisar React</td>

                  <td>
                    <span className="badge text-bg-primary">Baixa</span>
                  </td>

                  <td>
                    <span className="badge text-bg-success">Concluída</span>
                  </td>

                  <td>
                    <Link
                      href="/tarefas/editar/3"
                      className="btn btn-sm btn-outline-primary me-2"
                    >
                      Editar
                    </Link>

                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() =>
                        setTarefaSelecionada({
                          id: 3,
                          titulo: "Revisar React",
                        })
                      }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
                  >
                    Cancelar
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={() => setTarefaSelecionada(null)}
                  >
                    Excluir
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
