export default function Home() {
  return (
    <>
      <header className="taskflow-navbar py-3">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="taskflow-logo text-white">
            Task<span>Flow</span>
          </div>

          <button className="btn text-white fs-4">
            ☰
          </button>
        </div>
      </header>

      <main className="container py-5">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h1 className="fw-bold mb-1">Minhas tarefas</h1>

            <p className="text-secondary mb-0">
              Organize e acompanhe suas atividades.
            </p>
          </div>

          <button className="btn btn-primary">
            + Nova tarefa
          </button>
        </div>

        <div className="mt-4">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar tarefa..."
          />
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
                    <span className="badge text-bg-danger">
                      Alta
                    </span>
                  </td>

                  <td>
                    <span className="badge text-bg-primary">
                      Em andamento
                    </span>
                  </td>

                  <td>
                    <button className="btn btn-sm btn-outline-primary me-2">
                      Editar
                    </button>

                    <button className="btn btn-sm btn-outline-danger">
                      Excluir
                    </button>
                  </td>
                </tr>

                <tr>
                  <td>2</td>

                  <td>Finalizar projeto</td>

                  <td>
                    <span className="badge text-bg-warning">
                      Média
                    </span>
                  </td>

                  <td>
                    <span className="badge badge-pendente">
                      Pendente
                    </span>
                  </td>

                  <td>
                    <button className="btn btn-sm btn-outline-primary me-2">
                      Editar
                    </button>

                    <button className="btn btn-sm btn-outline-danger">
                      Excluir
                    </button>
                  </td>
                </tr>

                <tr>
                  <td>3</td>

                  <td>Revisar React</td>

                  <td>
                    <span className="badge text-bg-primary">
                      Baixa
                    </span>
                  </td>

                  <td>
                    <span className="badge text-bg-success">
                      Concluída
                    </span>
                  </td>

                  <td>
                    <button className="btn btn-sm btn-outline-primary me-2">
                      Editar
                    </button>

                    <button className="btn btn-sm btn-outline-danger">
                      Excluir
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}