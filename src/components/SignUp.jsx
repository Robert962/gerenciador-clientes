// Componente de cadastro de novo usuário (SignUp)
import { useState } from "react";
import { supabase } from "../supabaseClient";

function SignUp({ onSignUpSuccess }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  async function handleSignUp(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    // Verifica se já existe o nome de usuário
    const { data: existingUser, error: checkError } = await supabase
      .from("usuarios")
      .select("id")
      .eq("username", username)
      .single();
    if (existingUser) {
      setError("Nome de usuário já está em uso. Por favor, escolha outro.");
      setLoading(false);
      return;
    }
    if (checkError && checkError.code !== 'PGRST116') { // ignora erro de 'row not found'
      setError("Erro ao verificar nome de usuário. Tente novamente.");
      setLoading(false);
      return;
    }
    // Verifica se já existe o e-mail na tabela usuarios
    const { data: existingEmail, error: emailError } = await supabase
      .from("usuarios")
      .select("username")
      .eq("email", email)
      .single();
    if (existingEmail) {
      setError("Já existe um cadastro com este e-mail. Por favor, utilize outro nome de usuário ou e-mail.");
      setLoading(false);
      return;
    }
    if (emailError && emailError.code !== 'PGRST116') {
      setError("Erro ao verificar e-mail. Tente novamente.");
      setLoading(false);
      return;
    }
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });
    if (signUpError) {
      setError("Erro ao cadastrar: " + signUpError.message);
      setLoading(false);
      return;
    }
    const { error: userError } = await supabase.from("usuarios").insert([
      { username, email },
    ]);
    setLoading(false);
    if (userError) {
      setError("Usuário criado, mas houve erro ao salvar o nome de usuário: " + userError.message);
      setShowSuccess(true);
    } else {
      setSuccess(
        "Cadastro realizado! Verifique sua caixa de entrada e confirme o e-mail para ativar sua conta. Caso não encontre, verifique o spam/lixo eletrônico."
      );
      setShowSuccess(true);
      setUsername("");
      setEmail("");
      setPassword("");
    }
  }

  if (showSuccess) {
    return (
      <div className="bg-green-100 border border-green-300 rounded-xl p-8 max-w-md mx-auto mt-12 text-center animate-fade-in">
        <h2 className="text-2xl font-bold text-green-800 mb-4">
          Cadastro realizado!
        </h2>
        <p className="text-green-900 mb-4">
          Verifique sua caixa de entrada e confirme o e-mail para ativar sua conta.
          <br />
          Caso não encontre, verifique o spam/lixo eletrônico.
        </p>
        {error && (
          <div className="text-red-600 text-sm text-center font-semibold mb-2">
            {error}
          </div>
        )}
        <button
          className="mt-4 text-blue-700 underline"
          onClick={onSignUpSuccess}
        >
          Já confirmou? Clique aqui para fazer login
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSignUp}
      className="bg-gradient-to-br from-green-100 to-green-300 p-8 rounded-2xl shadow-xl flex flex-col gap-4 border border-green-200 max-w-md mx-auto mt-12 animate-fade-in"
    >
      <h2 className="text-2xl font-bold text-green-800 mb-2 text-center tracking-tight">
        Criar Conta
      </h2>
      <input
        type="text"
        placeholder="Nome de usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition w-full bg-white text-green-900 placeholder:text-green-400"
        required
        minLength={3}
        maxLength={20}
      />
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition w-full bg-white text-green-900 placeholder:text-green-400"
        required
      />
      <input
        type="password"
        placeholder="Senha (mínimo 8 caracteres, letras, números e símbolos)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition w-full bg-white text-green-900 placeholder:text-green-400"
        required
        minLength={8}
        pattern="^(?=.*[A-Za-z])(?=.*\d).{8,}$"
        title="A senha deve ter no mínimo 8 caracteres, incluindo letras, números e pode conter símbolos."
      />
      {error && (
        <div className="text-red-600 text-sm text-center font-semibold">
          {error}
        </div>
      )}
      {success && (
        <div className="text-green-700 text-sm text-center font-semibold">
          {success}
        </div>
      )}
      <button
        type="submit"
        className="bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg p-3 font-bold hover:from-green-700 hover:to-green-600 transition shadow-md mt-2 disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Cadastrando..." : "Cadastrar"}
      </button>
    </form>
  );
}

export default SignUp;
