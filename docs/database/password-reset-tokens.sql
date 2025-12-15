-- ============================================
-- SUPABASE SQL - Tabela de Tokens de Reset de Senha
-- ============================================
-- Tabela para armazenar tokens de recuperação de senha
-- ============================================

-- Remove a tabela se já existir (para desenvolvimento)
DROP TABLE IF EXISTS password_reset_tokens CASCADE;

-- Cria tabela de tokens de reset
CREATE TABLE password_reset_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES app_users(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para melhorar performance
CREATE INDEX idx_password_reset_tokens_token ON password_reset_tokens(token);
CREATE INDEX idx_password_reset_tokens_user_id ON password_reset_tokens(user_id);
CREATE INDEX idx_password_reset_tokens_expires_at ON password_reset_tokens(expires_at);

-- Índice composto para busca rápida de tokens válidos
CREATE INDEX idx_password_reset_tokens_valid ON password_reset_tokens(token, expires_at, used) 
WHERE used = FALSE;

-- Comentários da tabela
COMMENT ON TABLE password_reset_tokens IS 'Tabela para armazenar tokens de recuperação de senha';
COMMENT ON COLUMN password_reset_tokens.id IS 'Identificador único do token (UUID)';
COMMENT ON COLUMN password_reset_tokens.user_id IS 'ID do usuário que solicitou o reset (FK para app_users)';
COMMENT ON COLUMN password_reset_tokens.token IS 'Token único de recuperação (gerado aleatoriamente)';
COMMENT ON COLUMN password_reset_tokens.expires_at IS 'Data/hora de expiração do token (geralmente 1 hora após criação)';
COMMENT ON COLUMN password_reset_tokens.used IS 'Indica se o token já foi usado (não pode ser reutilizado)';
COMMENT ON COLUMN password_reset_tokens.created_at IS 'Data/hora de criação do token';

-- ============================================
-- ATIVAR ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE password_reset_tokens ENABLE ROW LEVEL SECURITY;

-- Política de SELECT: permite acesso via anon key (segurança garantida pela aplicação)
CREATE POLICY "Allow read access for password reset"
ON password_reset_tokens
FOR SELECT
USING (true);

-- Política de INSERT: permite criar tokens (via aplicação)
CREATE POLICY "Allow insert for password reset"
ON password_reset_tokens
FOR INSERT
WITH CHECK (true);

-- Política de UPDATE: permite marcar tokens como usados
CREATE POLICY "Allow update for password reset"
ON password_reset_tokens
FOR UPDATE
USING (true)
WITH CHECK (true);

-- Política de DELETE: permite limpar tokens expirados (opcional, via aplicação)
CREATE POLICY "Allow delete for password reset"
ON password_reset_tokens
FOR DELETE
USING (true);

-- ============================================
-- FUNÇÃO PARA LIMPAR TOKENS EXPIRADOS
-- ============================================

CREATE OR REPLACE FUNCTION cleanup_expired_tokens()
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM password_reset_tokens
  WHERE expires_at < NOW() OR used = TRUE;
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION cleanup_expired_tokens() IS 'Remove tokens expirados ou já utilizados (pode ser executada periodicamente)';

-- ============================================
-- FIM DO ARQUIVO SQL
-- ============================================

-- Para aplicar este SQL no Supabase:
-- 1. Acesse seu projeto no Supabase Dashboard
-- 2. Vá em "SQL Editor"
-- 3. Cole este arquivo
-- 4. Clique em "Run" ou "Execute"
-- 5. Verifique se não há erros

-- Sucesso! 🎉
-- Tabela de tokens de reset criada e pronta para uso

