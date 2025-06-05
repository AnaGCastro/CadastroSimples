import React from "react";
import Titulo from "./Titulo";

interface LayoutProps {
  titulo?: React.ReactNode;
  children?: React.ReactNode;
}

export default function Layout({ titulo, children }: LayoutProps) {
  return (
     <div className="flex flex-col w-2/3 bg-white text-gray-800 rounded-md">
      {titulo && <Titulo>{"Cadastro Simples"}</Titulo>}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}