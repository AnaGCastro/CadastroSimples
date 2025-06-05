"use client";

import Cliente from "@/core/Cliente";
import { IconeEdicao, IconeLixo } from "./Icones";

interface TabelaProps {
  children?: React.ReactNode;
  clientes: Cliente[]
  clienteSelecionado?: (cliente: Cliente) => void;
  clienteExcluido?: (cliente: Cliente) => void;
}

export default function Tabela(props: TabelaProps) {


    const exibrAcoes = props.clienteSelecionado || props.clienteExcluido;


    function redenrizarCabecalho() {
        return (
               <tr>
            <th className="text-left p-4">Código</th>
            <th className="text-left p-4">Nome</th>
            <th className="text-left p-4">Idade</th>
            {exibrAcoes && <th className="p-4">Ações</th>}
        </tr>
        )
    }



    function redenrizarDados() {
        return props.clientes?.map((cliente,i) => {
            return (
              <tr key={cliente.id ?? i}
                    className={i % 2 === 0 ? 'bg-purple-200' : 'bg-purple-100'}>
                    <td className="text-left p-4">{cliente.id}</td>
                    <td className="text-left p-4">{cliente.nome}</td>
                    <td className="text-left p-4">{cliente.idade}</td>
                    {exibrAcoes ? redenrizarAcoes(cliente) : false}
                </tr>
            )
        
        })
    }


    function redenrizarAcoes(cliente: Cliente) {
        return (
            <td className="flex justify-center">
                {props.clienteSelecionado && (
                    <button
                        onClick={() => props.clienteSelecionado?.(cliente)}
                        className={`flex justify-center items-center text-green-600 rounded-full hover:bg-purple-50 p-2 m-1`}
                    >
                        {IconeEdicao}
                    </button>
                )}
                {props.clienteExcluido && (
                    <button
                        onClick={() => props.clienteExcluido?.(cliente)}
                        className={`flex justify-center items-center text-red-500 rounded-full hover:bg-purple-50 p-2 m-1`}
                    >
                        {IconeLixo}
                    </button>
                )}
            </td>
        )
    }


  return (
    <table className="w-full rounded-xl overflow-hidden">
        <thead className="bg-gradient-to-r from-purple-500 to-purple-800 text-gray-100">
        {redenrizarCabecalho()}
        </thead>
      {props.children}
      <tbody>
        {redenrizarDados()}
      </tbody>
    </table>
  );
}