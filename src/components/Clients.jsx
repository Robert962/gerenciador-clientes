// Componente de tabela para exibir a lista de clientes
function Clients({ clients, onDeleteClient }) {
  return (
    // Wrapper para responsividade horizontal
    <div className="overflow-x-auto">
      {/* Tabela estilizada com Tailwind CSS */}
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-slate-100">
            <th className="py-2 px-4 text-left">Nome Completo</th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">Telefone</th>
            <th className="py-2 px-4">Ações</th>
          </tr>
        </thead>
        <tbody>
          {/* Exibe mensagem caso não haja clientes cadastrados */}
          {clients.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center py-4 text-slate-500">
                Nenhum cliente cadastrado.
              </td>
            </tr>
          )}
          {/* Mapeia e exibe cada cliente em uma linha da tabela */}
          {clients.map((client) => (
            <tr key={client.id} className="border-b last:border-b-0">
              <td className="py-2 px-4">{client.nome_completo}</td>
              <td className="py-2 px-4">{client.email}</td>
              <td className="py-2 px-4">{client.telefone}</td>
              <td className="py-2 px-4 text-center">
                {/* Botão para excluir cliente, chama função recebida por props */}
                <button
                  onClick={() => onDeleteClient(client.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
// Exporta o componente para uso em outras partes do app
export default Clients;
