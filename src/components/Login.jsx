// Componente de login de usuário (Login)
import { useState } from "react";
import { supabase } from "../supabaseClient";

function Login({ onLoginSuccess }) {
  const [identifier, setIdentifier] = useState(""); // Pode ser e-mail ou usuário
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    let email = identifier;
    // Se não for e-mail, busca pelo nome de usuário
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(identifier)) {
      const { data, error: userError } = await supabase
        .from("usuarios")
        .select("email")
        .eq("username", identifier)
        .single();
      if (userError || !data) {
        setError("Usuário não encontrado.");
        setLoading(false);
        return;
      }
      email = data.email;
    }
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      setError("E-mail, usuário ou senha inválidos.");
    } else {
      setIdentifier("");
      setPassword("");
      if (onLoginSuccess) onLoginSuccess();
    }
  }

  return (
    <div className="flex flex-col items-center mb-6">
      <img src="/logo-uniasselvi.png" alt="Logo da Uniasselvi" className="w-16 h-16 mb-2" />
      <h2 className="text-2xl font-bold text-blue-900 text-center mb-1 uppercase">IMERSÃO PROFISSIONAL: IMPLEMENTAÇÃO DE UMA APLICAÇÃO</h2>
      <form
        onSubmit={handleLogin}
        className="bg-gradient-to-br from-blue-100 to-blue-300 p-8 rounded-2xl shadow-xl flex flex-col gap-4 border border-blue-200 max-w-md mx-auto mt-12 animate-fade-in"
      >
        <h1 className="text-3xl font-extrabold text-blue-900 mb-4 text-center tracking-tight">
          Sistema de Cadastro de Clientes
        </h1>
        <p className="text-blue-700 text-center mb-4">
          Faça login para acessar sua área exclusiva e gerenciar seus clientes com segurança.
        </p>
        <input
          type="text"
          placeholder="E-mail ou nome de usuário"
          value={identifier}
          onChange={e => setIdentifier(e.target.value)}
          className="p-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-full bg-white text-blue-900 placeholder:text-blue-400"
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="p-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-full bg-white text-blue-900 placeholder:text-blue-400"
          required
        />
        {error && <div className="text-red-600 text-sm text-center font-semibold">{error}</div>}
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg p-3 font-bold hover:from-blue-700 hover:to-blue-600 transition shadow-md mt-2 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}

export default Login;
