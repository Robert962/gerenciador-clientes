import { supabase } from '../supabaseClient';

// Função para buscar todos os clientes do usuário logado
export async function listarClientes(userId) {
  // Busca todos os registros da tabela 'clientes' do usuário
  const { data, error } = await supabase
    .from('clientes')
    .select('*')
    .eq('user_id', userId)
    .order('id', { ascending: false });
  if (error) throw error;
  return data;
}

// Função para adicionar um cliente
export async function adicionarCliente({ nome_completo, email, telefone, user_id }) {
  // Insere um novo registro na tabela 'clientes' vinculado ao usuário
  const { data, error } = await supabase
    .from('clientes')
    .insert([{ nome_completo, email, telefone, user_id }]);
  if (error) throw error;
  return data;
}

// Função para excluir um cliente
export async function excluirCliente(id) {
  // Remove o registro com o id informado
  const { error } = await supabase.from('clientes').delete().eq('id', id);
  if (error) throw error;
}
