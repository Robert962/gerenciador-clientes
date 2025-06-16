// Componente principal do app, responsável por renderizar a página de clientes
import ClientsPage from "./pages/ClientsPage";
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  const [user, setUser] = useState(null);
  const [showSignUp, setShowSignUp] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verifica se o usuário está logado ao carregar o app
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null);
      setLoading(false);
    });
    // Listener para mudanças de autenticação
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
  }

  if (loading) {
    return <div className="text-center text-blue-700 mt-20">Carregando...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200">
        {showSignUp ? (
          <>
            <SignUp onSignUpSuccess={() => setShowSignUp(false)} />
            <button className="mt-4 text-blue-700 underline" onClick={() => setShowSignUp(false)}>
              Já tem conta? Entrar
            </button>
          </>
        ) : (
          <>
            <Login onLoginSuccess={() => setUser(true)} />
            <button className="mt-4 text-blue-700 underline" onClick={() => setShowSignUp(true)}>
              Não tem conta? Cadastre-se
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-end p-4">
        <button onClick={handleLogout} className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg px-4 py-2 font-bold hover:from-blue-700 hover:to-blue-600 transition shadow-md">
          Sair
        </button>
      </div>
      <ClientsPage />
    </div>
  );
}
// Exporta o App para ser usado no ponto de entrada do React
export default App;
