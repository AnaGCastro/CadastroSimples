import Cliente from "@/core/Cliente";

interface TabelaProps {
  children?: React.ReactNode;
  clientes: Cliente[]
}

export default function Tabela(props: TabelaProps) {

    function redenrizarCabecalho() {
        return (
               <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Idade</th>
        </tr>
        )
    }



    function redenrizarDados() {
        return props.clientes?.map((cliente,i) => {
            return (
                <tr key={cliente.id ?? i}>
                    <td>{cliente.id}</td>
                    <td>{cliente.nome}</td>
                    <td>{cliente.idade}</td>
                </tr>
            )
        
        })
    }


  return (
    <table>
        <thead>
        {redenrizarCabecalho()}
        </thead>
      {props.children}
      <tbody>
        {redenrizarDados()}
      </tbody>
    </table>
  );
}