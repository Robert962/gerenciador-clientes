// Componente de formulário para cadastro de clientes
import { useState } from "react";

function AddClient({ onAddClient }) {
  // Estados locais para os campos do formulário e mensagens de erro
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  // Função utilitária para validar o formato do e-mail
  function validateEmail(email) {
    // Expressão regular simples para validação de e-mail
    return /\S+@\S+\.\S+/.test(email);
  }

  // Função chamada ao submeter o formulário
  function handleSubmit(e) {
    e.preventDefault();
    // Validação do campo nome
    if (!name.trim()) {
      setError("Nome é obrigatório.");
      return;
    }
    // Validação do campo e-mail
    if (!email.trim() || !validateEmail(email)) {
      setError("E-mail inválido.");
      return;
    }
    setError("");
    // Chama a função recebida por props para adicionar o cliente, usando 'nome_completo' ao invés de 'nome'
    onAddClient({ nome_completo: name, email, telefone: phone });
    // Limpa os campos após o cadastro
    setName("");
    setEmail("");
    setPhone("");
  }

  return (
    // Formulário estilizado com Tailwind CSS
    <form onSubmit={handleSubmit} className="mb-8 bg-white p-4 rounded shadow flex flex-col gap-3">
      <input
        type="text"
        placeholder="Nome Completo"
        value={name}
        onChange={e => setName(e.target.value)}
        className="p-2 rounded border border-slate-300"
        required
      />
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="p-2 rounded border border-slate-300"
        required
      />
      <input
        type="text"
        placeholder="Telefone (opcional)"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        className="p-2 rounded border border-slate-300"
      />
      {/* Exibe mensagem de erro, se houver */}
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <button type="submit" className="bg-blue-600 text-white rounded p-2 font-bold hover:bg-blue-700 transition">
        Cadastrar
      </button>
    </form>
  );
}
// Exporta o componente para uso em outras partes do app
export default AddClient;
