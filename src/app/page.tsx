import Cliente from "@/core/Cliente";
import Layout from "./components/Layout";
import Tabela from "./components/Tabela";


export default function Home() {

  const clientes = [
    new Cliente("Ana", 34, "1"),
    new Cliente("Bia", 23, "2"),
    new Cliente("Carlos", 45, "3"),
    new Cliente("Daniel", 29, "4"),
  ]
    

  return (
  <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <Layout titulo="Cadastro Simples">
      <Tabela clientes={clientes}></Tabela>
      </Layout>
    </div>
  )
}