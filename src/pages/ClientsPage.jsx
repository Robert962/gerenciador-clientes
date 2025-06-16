// Página principal que reúne cadastro e listagem de clientes
import AddClient from "../components/AddClient";
import Clients from "../components/Clients";
import Tabs from "../components/Tabs";
import { useState, useEffect } from "react";
import { listarClientes, adicionarCliente, excluirCliente } from "../services/clientesService";
import { supabase } from "../supabaseClient";

function ClientsPage() {
  // Estado local para armazenar os clientes cadastrados.
  const [clients, setClients] = useState([]);
  // Estado para feedback visual ao usuário (mensagens de sucesso/erro).
  const [feedback, setFeedback] = useState("");
  // Estado para loading
  const [loading, setLoading] = useState(false);
  // Estado para o usuário logado
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    // Recupera o usuário logado do Supabase
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  // Carrega os clientes do Supabase ao montar o componente e quando o usuário mudar
  useEffect(() => {
    if (!user) return;
    async function fetchClientes() {
      setLoading(true);
      try {
        const data = await listarClientes(user.id);
        setClients(data);
      } catch {
        setFeedback("Erro ao carregar clientes.");
      } finally {
        setLoading(false);
      }
    }
    fetchClientes();
  }, [user]);

  // Função para adicionar um novo cliente ao Supabase
  async function handleAddClient({ nome_completo, email, telefone }) {
    if (!user) return;
    setLoading(true);
    try {
      await adicionarCliente({ nome_completo, email, telefone, user_id: user.id });
      const data = await listarClientes(user.id);
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
        setClients(await listarClientes(user.id));
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
        {activeTab === 0 ? "Cadastro de Clientes" : "Clientes Cadastrados"}
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
      {/* Sistema de abas para cadastro e listagem de clientes */}
      <Tabs tabs={["Cadastrar", `Clientes (${clients.length})`]} setActiveTab={setActiveTab}>
        {/* Formulário de cadastro de clientes */}
        <AddClient onAddClient={handleAddClient} />
        {/* Tabela de listagem de clientes */}
        <Clients clients={clients} onDeleteClient={handleDeleteClient} />
      </Tabs>
    </div>
  );
}
// Exporta a página para uso no App principal
export default ClientsPage;
