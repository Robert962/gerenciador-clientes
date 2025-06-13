// Componente de tabela para exibir a lista de clientes
function Clients({ clients, onDeleteClient }) {
  return (
    // Wrapper para responsividade horizontal
    <div className="overflow-x-auto mt-8">
      {/* Tabela estilizada com Tailwind CSS */}
      <table className="min-w-full bg-gradient-to-br from-blue-50 to-blue-200 rounded-2xl shadow-xl border border-blue-200 animate-fade-in">
        <thead>
          <tr className="bg-blue-200">
            <th className="py-3 px-4 text-left text-blue-900 font-bold text-lg">Nome Completo</th>
            <th className="py-3 px-4 text-left text-blue-900 font-bold text-lg">Email</th>
            <th className="py-3 px-4 text-left text-blue-900 font-bold text-lg">Telefone</th>
            <th className="py-3 px-4 text-center text-blue-900 font-bold text-lg">Ações</th>
          </tr>
        </thead>
        <tbody>
          {/* Exibe mensagem caso não haja clientes cadastrados */}
          {clients.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center py-6 text-blue-500 text-lg font-semibold">
                Nenhum cliente cadastrado.
              </td>
            </tr>
          )}
          {/* Mapeia e exibe cada cliente em uma linha da tabela */}
          {clients.map((client) => (
            <tr key={client.id} className="border-b last:border-b-0 hover:bg-blue-100 transition">
              <td className="py-3 px-4 text-blue-900 font-medium">{client.nome_completo}</td>
              <td className="py-3 px-4 text-blue-900">{client.email}</td>
              <td className="py-3 px-4 text-blue-900">{client.telefone}</td>
              <td className="py-3 px-4 text-center">
                {/* Botão para excluir cliente, chama função recebida por props */}
                <button
                  onClick={() => onDeleteClient(client.id)}
                  className="bg-gradient-to-r from-red-500 to-red-400 text-white px-4 py-2 rounded-lg font-bold shadow hover:from-red-600 hover:to-red-500 transition"
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
