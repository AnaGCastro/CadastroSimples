"use client";

import Cliente from "@/core/Cliente";
import Layout from "./components/Layout";
import Tabela from "./components/Tabela";
import Botao from "./components/Botao";
import Formulario from "./components/Formulario";
import { useEffect, useRef, useState } from "react";
import ClienteRepositorio from "@/core/ClienteRepositorio";
// Remova o import de ColecaoCliente daqui!

export default function Home() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio());
  const [visivel, setVisivel] = useState<'tabela' | 'formulario'>('tabela');
  const repo = useRef<ClienteRepositorio>();

  useEffect(() => {
    // Importação dinâmica só no cliente
    import("@/backend/db/ColecaoCliente").then(({ default: ColecaoCliente }) => {
      repo.current = new ColecaoCliente();
      obterTodos();
    });
    // eslint-disable-next-line
  }, []);

  function obterTodos() {
    repo.current?.obterTodos().then(clientes => {
      setClientes(clientes);
      setVisivel('tabela');
    });
  }

  function clienteSelecionado(cliente: Cliente) {
    setCliente(cliente);
    setVisivel('formulario');
  }

  async function clienteExcluido(cliente: Cliente) {
    await repo.current?.excluir(cliente);
    obterTodos();
  }

  function novoCliente() {
    setCliente(Cliente.vazio());
    setVisivel('formulario');
  }

  async function salvarCliente(cliente: Cliente) {
    await repo.current?.salvar(cliente);
    obterTodos();
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <Layout titulo="Cadastro Simples">
        {visivel === 'tabela' ? (
          <>
            <div className="flex justify-end">
              <Botao cor="green" className="mb-4" onClick={novoCliente}>
                Novo Cliente
              </Botao>
            </div>
            <Tabela
              clientes={clientes}
              clienteSelecionado={clienteSelecionado}
              clienteExcluido={clienteExcluido}
            />
          </>
        ) : (
          <Formulario
            cliente={cliente}
            clienteMudou={salvarCliente}
            cancelado={() => setVisivel('tabela')}
          />
        )}
      </Layout>
    </div>
  );
}