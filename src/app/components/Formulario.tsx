import React, { useState } from "react";
import Entrada from "./Entrada";
import Cliente from '../../core/Cliente';
import Botao from "./Botao";

interface FormularioProps {
    cliente : Cliente
  children?: React.ReactNode;
}

export default function Formulario(props: FormularioProps) {
    const id = props.cliente?.id  
    const [nome, setNome] = useState(props.cliente?.nome ?? '')
const [idade, setIdade] = useState(props.cliente?.idade ?? '')
  return (
    <div>
        {id ? (
            <Entrada 
            somenteLeitura
            label="Código"  
            valor={id}
            className="mb-5"
            />
        ) : false}
      <Entrada 
      label="Nome" 
      valor={nome}
      valorMudou={setNome}
      className="mb-5"
       />
      <Entrada 
      label="Idade" 
      tipo="number"
      valor={idade}
      valorMudou={setIdade}
      />
      {props.children}

      <div className="flex justify-end mt-7cont">
        <Botao cor="blue" className="mr-2">
            {id ? 'Alterar' : 'Salvar'}
        </Botao>
        <Botao cor="gray">
            Cancelar
        </Botao>
      </div>
    </div>
  );
}