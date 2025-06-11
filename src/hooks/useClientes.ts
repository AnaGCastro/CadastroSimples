import { useEffect, useState, useRef } from "react";
import Cliente from "@/core/Cliente";
import ClienteRepositorio from "@/core/ClienteRepositorio";
import useTabelaOuForm from "./useTabelOuForm";

export default function useClientes() {

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio());
  
  const repo = useRef<ClienteRepositorio | null>(null);

  const {tabelaVisivel, exibirTabela, exibirFormulrio} = useTabelaOuForm()

  useEffect(() => {
    import("@/backend/db/ColecaoCliente").then(({ default: ColecaoCliente }) => {
      repo.current = new ColecaoCliente();
      obterTodos();
    });
  }, []);

  function obterTodos() {
    repo.current?.obterTodos().then((clientes) => {
      setClientes(clientes);
      exibirTabela()
    });
  }

  function selecionarCliente(cliente: Cliente) {
    setCliente(cliente);
    exibirFormulrio()
  }

  async function excluirCliente(cliente: Cliente) {
    await repo.current?.excluir(cliente);
    obterTodos();
  }

  function novoCliente() {
    setCliente(Cliente.vazio());
    exibirFormulrio()
  }

  async function salvarCliente(cliente: Cliente) {
    await repo.current?.salvar(cliente);
    obterTodos();
  }

  return {
    cliente,
    clientes,
    novoCliente,
    salvarCliente,
    excluirCliente,
    selecionarCliente,
    obterTodos,
    tabelaVisivel,

  }

}