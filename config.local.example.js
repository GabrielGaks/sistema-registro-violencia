/**
 * ========================================
 * ARQUIVO DE CONFIGURAÇÃO LOCAL - EXEMPLO
 * ========================================
 * 
 * ⚠️ IMPORTANTE: Este é um arquivo de exemplo.
 * 
 * Para usar:
 * 1. Copie este arquivo para config.local.js
 * 2. Preencha com suas credenciais reais
 * 3. O arquivo config.local.js está no .gitignore e NÃO será commitado
 * 
 * Este arquivo será carregado automaticamente pelo config.js
 * ========================================
 */

// Defina suas credenciais aqui
const CONFIG_LOCAL = {
  // URL para AUTENTICAÇÃO
  APPS_SCRIPT_AUTH: 'https://script.google.com/macros/s/SUA_URL_AUTH_AQUI/exec',
  
  // URL para CASOS
  APPS_SCRIPT_CASOS: 'https://script.google.com/macros/s/SUA_URL_CASOS_AQUI/exec',
  
  // ID da planilha principal
  SPREADSHEET_ID: 'SEU_ID_DA_PLANILHA_AQUI',
  
  // Nome da aba
  SHEET_NAME: 'Página1',
  
  // Supabase (se estiver usando)
  SUPABASE_URL: 'https://seu-projeto.supabase.co',
  SUPABASE_KEY: 'sua-chave-anon-aqui',
  
  // URL base do site (para emails de recuperação de senha)
  BASE_URL: 'https://gabrielgaks.github.io/sistema-registro-violencia/FormularioRegistroV2'
};

// Exportar para config.js usar
if (typeof window !== 'undefined') {
  window.CONFIG_LOCAL = CONFIG_LOCAL;
}

