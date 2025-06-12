import { createClient } from '@supabase/supabase-js';

// Configuração do Supabase para este projeto
const supabaseUrl = 'https://tipqpjrepaeyphbvrdrn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpcHFwanJlcGFleXBoYnZyZHJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3MzUxNjksImV4cCI6MjA2NTMxMTE2OX0.hV_j9G0L5saxUuR4oHnxlplqxmhXm_nZSq-zHRUHcNY';

export const supabase = createClient(supabaseUrl, supabaseKey);
// Este client será usado para todas as operações com o banco de dados.
