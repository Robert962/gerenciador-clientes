import { supabase } from '../supabaseClient';

// Função para buscar todos os clientes
export async function listarClientes() {
  // Busca todos os registros da tabela 'clientes'
  const { data, error } = await supabase.from('clientes').select('*').order('id', { ascending: false });
  if (error) throw error;
  return data;
}

// Função para adicionar um cliente
export async function adicionarCliente({ nome_completo, email, telefone }) {
  // Insere um novo registro na tabela 'clientes'
  const { data, error } = await supabase.from('clientes').insert([{ nome_completo, email, telefone }]);
  if (error) throw error;
  return data;
}

// Função para excluir um cliente
export async function excluirCliente(id) {
  // Remove o registro com o id informado
  const { error } = await supabase.from('clientes').delete().eq('id', id);
  if (error) throw error;
}
