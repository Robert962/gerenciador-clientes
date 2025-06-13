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
    <form
      onSubmit={handleSubmit}
      className="mb-8 bg-gradient-to-br from-blue-100 to-blue-300 p-8 rounded-2xl shadow-xl flex flex-col gap-4 border border-blue-200 max-w-md mx-auto animate-fade-in"
    >
      <h2 className="text-2xl font-bold text-blue-800 mb-2 text-center tracking-tight">
        Novo Cliente
      </h2>
      <input
        type="text"
        placeholder="Nome Completo"
        value={name}
        onChange={e => setName(e.target.value)}
        className="p-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-full bg-white text-blue-900 placeholder:text-blue-400"
        required
      />
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="p-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-full bg-white text-blue-900 placeholder:text-blue-400"
        required
      />
      <input
        type="text"
        placeholder="Telefone (opcional)"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        className="p-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-full bg-white text-blue-900 placeholder:text-blue-400"
      />
      {/* Exibe mensagem de erro, se houver */}
      {error && <div className="text-red-600 text-sm text-center font-semibold">{error}</div>}
      <button
        type="submit"
        className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg p-3 font-bold hover:from-blue-700 hover:to-blue-600 transition shadow-md mt-2"
      >
        Cadastrar
      </button>
    </form>
  );
}
// Exporta o componente para uso em outras partes do app
export default AddClient;
