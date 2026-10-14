import Link from "next/link";

export default function NovaTarefa() {
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

        <div className="mt-4">
          <label className="form-label fw-semibold">
            Título <span className="text-danger">*</span>
          </label>

          <input
            type="text"
            className="form-control"
            placeholder="Digite o título da tarefa"
          />
        </div>

        <div className="mt-4">
          <label className="form-label fw-semibold">Descrição</label>

          <textarea
            className="form-control"
            rows="4"
            placeholder="Digite a descrição da tarefa"
          ></textarea>
        </div>

        <div className="row mt-4">
          <div className="col-md-6">
            <label className="form-label fw-semibold">
              Prioridade <span className="text-danger">*</span>
            </label>

            <select className="form-select">
              <option value="">Selecione a prioridade</option>
              <option value="alta">Alta</option>
              <option value="media">Média</option>
              <option value="baixa">Baixa</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">
              Situação <span className="text-danger">*</span>
            </label>

            <select className="form-select">
              <option value="">Selecione a situação</option>
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

          <button className="btn btn-primary">Salvar tarefa</button>
        </div>
      </main>
    </>
  );
}
