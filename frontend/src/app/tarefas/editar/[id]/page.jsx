"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/Header";

export default function EditarTarefa() {
  const params = useParams();
  const router = useRouter();

  const id = params.id;

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [prioridade, setPrioridade] = useState("");
  const [situacao, setSituacao] = useState("");

  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function buscarTarefa() {
      try {
        setCarregando(true);
        setErro("");

        const resposta = await fetch(
          `http://localhost:3001/tarefas/${id}`
        );

        if (resposta.status === 404) {
          setErro("Tarefa não encontrada");
          return;
        }

        if (!resposta.ok) {
          throw new Error("Erro ao buscar tarefa");
        }

        const tarefa = await resposta.json();

        setTitulo(tarefa.titulo);
        setDescricao(tarefa.descricao);
        setPrioridade(tarefa.prioridade);
        setSituacao(tarefa.situacao);
      } catch (error) {
        console.error(error);
        setErro("Não foi possível carregar a tarefa.");
      } finally {
        setCarregando(false);
      }
    }

    if (id) {
      buscarTarefa();
    }
  }, [id]);

  async function atualizarTarefa(event) {
    event.preventDefault();

    try {
      setSalvando(true);
      setErro("");

      const resposta = await fetch(
        `http://localhost:3001/tarefas/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            titulo,
            descricao,
            prioridade,
            situacao,
          }),
        }
      );

      if (resposta.status === 404) {
        setErro("Tarefa não encontrada");
        return;
      }

      if (!resposta.ok) {
        const dadosErro = await resposta.json();

        throw new Error(
          dadosErro.mensagem || "Erro ao atualizar tarefa"
        );
      }

      sessionStorage.setItem(
        "mensagemSucesso",
        "Tarefa atualizada com sucesso."
      );

      router.push("/");
    } catch (error) {
      console.error(error);

      setErro(
        error.message || "Não foi possível atualizar a tarefa."
      );
    } finally {
      setSalvando(false);
    }
  }

  return (
    <>
      <Header />

      <main className="container py-5">
        <Link href="/" className="text-decoration-none">
          ← Voltar para tarefas
        </Link>

        <div className="mt-3">
          <h1 className="fw-bold mb-1">
            Editar tarefa
          </h1>

          <p className="text-secondary">
            Altere os dados da tarefa conforme necessário.
          </p>
        </div>

        {erro && (
          <div className="alert alert-danger mt-4">
            {erro}
          </div>
        )}

        {carregando && (
          <p className="text-secondary mt-4">
            Carregando tarefa...
          </p>
        )}

        {!carregando && !erro && (
          <form onSubmit={atualizarTarefa}>
            <div className="mt-4">
              <label
                htmlFor="titulo"
                className="form-label fw-semibold"
              >
                Título <span className="text-danger">*</span>
              </label>

              <input
                id="titulo"
                type="text"
                className="form-control"
                value={titulo}
                onChange={(event) =>
                  setTitulo(event.target.value)
                }
                required
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="descricao"
                className="form-label fw-semibold"
              >
                Descrição
              </label>

              <textarea
                id="descricao"
                className="form-control"
                rows="4"
                value={descricao}
                onChange={(event) =>
                  setDescricao(event.target.value)
                }
              ></textarea>
            </div>

            <div className="row mt-4">
              <div className="col-md-6">
                <label
                  htmlFor="prioridade"
                  className="form-label fw-semibold"
                >
                  Prioridade{" "}
                  <span className="text-danger">*</span>
                </label>

                <select
                  id="prioridade"
                  className="form-select"
                  value={prioridade}
                  onChange={(event) =>
                    setPrioridade(event.target.value)
                  }
                  required
                >
                  <option value="Alta">Alta</option>
                  <option value="Média">Média</option>
                  <option value="Baixa">Baixa</option>
                </select>
              </div>

              <div className="col-md-6">
                <label
                  htmlFor="situacao"
                  className="form-label fw-semibold"
                >
                  Situação{" "}
                  <span className="text-danger">*</span>
                </label>

                <select
                  id="situacao"
                  className="form-select"
                  value={situacao}
                  onChange={(event) =>
                    setSituacao(event.target.value)
                  }
                  required
                >
                  <option value="Pendente">
                    Pendente
                  </option>

                  <option value="Em andamento">
                    Em andamento
                  </option>

                  <option value="Concluída">
                    Concluída
                  </option>
                </select>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <Link
                href="/"
                className="btn btn-secondary"
              >
                Cancelar
              </Link>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={salvando}
              >
                {salvando
                  ? "Atualizando..."
                  : "Atualizar tarefa"}
              </button>
            </div>
          </form>
        )}
      </main>
    </>
  );
}