"use client";

import Cliente from "@/core/Cliente";
import Layout from "./components/Layout";
import Tabela from "./components/Tabela";
import Botao from "./components/Botao";
import Formulario from "./components/Formulario";
import { useState } from "react";



export default function Home() {

  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio())

  const [visivel, setVisivel] = useState<'tabela' | 'formulario'>('tabela');

  const clientes = [
    new Cliente("Ana", 24, "1"),
    new Cliente("Juliana", 40, "2"),
    new Cliente("Tami", 33, "3"),
    new Cliente("Andrea", 52, "4"),
  ]

  function clienteSelecionado(cliente: Cliente) {
    setCliente(cliente)
    setVisivel('formulario')

  }


  function clienteExcluido(cliente: Cliente) {
    console.log(`Excluir... ${cliente.nome}`);

  }

  function novoCliente(cliente: Cliente) {
    setCliente(Cliente.vazio())
    setVisivel('formulario')
  }

  function salvarCliente(cliente: Cliente) {
    console.log(cliente)
    setVisivel('tabela')
  }


  

  return (
  <div className="flex justify-center items-center h-screen
   bg-gradient-to-r from-blue-500 to-purple-500">

      <Layout titulo="Cadastro Simples">
        {visivel === 'tabela' ? (
          <>
              <div className="flex justify-end">
         <Botao cor="green" className="mb-4" 
         onClick={novoCliente}>Novo Cliente</Botao>
        </div>
       
      <Tabela clientes={clientes} clienteSelecionado={clienteSelecionado} 
      clienteExcluido={clienteExcluido}
      /> 
      </>
        ) : (

           <Formulario cliente={cliente} 
           clienteMudou={salvarCliente}
            cancelado={() => setVisivel('tabela')}
           />
        )}
      </Layout>
    </div>
  )
}