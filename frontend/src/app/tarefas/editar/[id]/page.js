import Link from "next/link";

export default function EditarTarefa() {
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
          <h1 className="fw-bold mb-1">Editar tarefa</h1>

          <p className="text-secondary">Altere os dados da tarefa conforme necessário.</p>
        </div>

        <div className="mt-4">
          <label className="form-label fw-semibold">
            Título <span className="text-danger">*</span>
          </label>

          <input type="text" className="form-control" defaultValue="Estudar API" />
        </div>

        <div className="mt-4">
          <label className="form-label fw-semibold">Descrição</label>

          <textarea
            className="form-control"
            rows="4"
            defaultValue="Revisar rotas e testes da API para o projeto final."
          ></textarea>
        </div>

        <div className="row mt-4">
          <div className="col-md-6">
            <label className="form-label fw-semibold">
              Prioridade <span className="text-danger">*</span>
            </label>

            <select className="form-select" defaultValue="alta">
              <option value="alta">Alta</option>
              <option value="media">Média</option>
              <option value="baixa">Baixa</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">
              Situação <span className="text-danger">*</span>
            </label>

            <select className="form-select" defaultValue="andamento">
              <option value="pendente">Pendente</option>
              <option value="andamento">Em andamento</option>
              <option value="concluida">Concluída</option>
            </select>
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2 mt-4">
          <Link href="/" className="btn btn-secondary">
            Cancelar
          </Link>

          <button className="btn btn-primary">Atualizar tarefa</button>
        </div>
      </main>
    </>
  );
}
