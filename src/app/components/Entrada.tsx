import React from "react";

interface EntradaProps {
  tipo?: 'text' | 'number';
  label: string;
  valor?: string | number;
  children?: React.ReactNode;
  somenteLeitura?: boolean;
  className?:string;
  valorMudou?: (valor: string | number) => void;
}

export default function Entrada(props: EntradaProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let valor: string | number = e.target.value;
    if (props.tipo === "number") {
      valor = e.target.value === "" ? "" : Number(e.target.value);
    }
    props.valorMudou?.(valor);
  }

  return (
    <div className={`flex flex-col ${props.className}`}>
      {props.children}
      <label className="mb-2">
        {props.label}
      </label>
      <input
        type={props.tipo ?? 'text'}
        value={props.valor}
        readOnly={props.somenteLeitura}
        onChange={handleChange}
        className={`border border-purple-500 rounded-lg focus:outline-none
             bg-gray-100 px-4 py-2 ${props.somenteLeitura ? '' : 'focus:bg-white'}`}
      />
    </div>
  );
}