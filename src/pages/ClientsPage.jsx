// Página principal que reúne cadastro e listagem de clientes
import AddClient from "../components/AddClient";
import Clients from "../components/Clients";
import { useState, useEffect } from "react";
import { listarClientes, adicionarCliente, excluirCliente } from "../services/clientesService";

function ClientsPage() {
  // Estado local para armazenar os clientes cadastrados.
  const [clients, setClients] = useState([]);
  // Estado para feedback visual ao usuário (mensagens de sucesso/erro).
  const [feedback, setFeedback] = useState("");
  // Estado para loading
  const [loading, setLoading] = useState(false);

  // Carrega os clientes do Supabase ao montar o componente
  useEffect(() => {
    async function fetchClientes() {
      setLoading(true);
      try {
        const data = await listarClientes();
        setClients(data);
      } catch {
        setFeedback("Erro ao carregar clientes.");
      } finally {
        setLoading(false);
      }
    }
    fetchClientes();
  }, []);

  // Função para adicionar um novo cliente ao Supabase
  async function handleAddClient({ nome_completo, email, telefone }) {
    setLoading(true);
    try {
      await adicionarCliente({ nome_completo, email, telefone });
      const data = await listarClientes();
      setClients(data);
      setFeedback("Cliente cadastrado com sucesso!");
    } catch (e) {
      setFeedback("Erro ao cadastrar cliente: " + (e.message || JSON.stringify(e)));
    } finally {
      setLoading(false);
      setTimeout(() => setFeedback(""), 4000);
    }
  }

  // Função para excluir um cliente do Supabase
  async function handleDeleteClient(clientId) {
    if (window.confirm("Tem certeza que deseja excluir este cliente?")) {
      setLoading(true);
      try {
        await excluirCliente(clientId);
        setClients(await listarClientes());
        setFeedback("Cliente excluído com sucesso!");
      } catch {
        setFeedback("Erro ao excluir cliente.");
      } finally {
        setLoading(false);
        setTimeout(() => setFeedback(""), 2000);
      }
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-slate-800">
        Cadastro de Clientes
      </h1>
      {/* Exibe feedback visual para o usuário */}
      {feedback && (
        <div className="mb-4 p-2 bg-green-200 text-green-800 rounded text-center">
          {feedback}
        </div>
      )}
      {loading && (
        <div className="mb-4 p-2 bg-blue-100 text-blue-800 rounded text-center">
          Carregando...
        </div>
      )}
      {/* Formulário de cadastro de clientes */}
      <AddClient onAddClient={handleAddClient} />
      {/* Tabela de listagem de clientes */}
      <Clients clients={clients} onDeleteClient={handleDeleteClient} />
    </div>
  );
}
// Exporta a página para uso no App principal
export default ClientsPage;
