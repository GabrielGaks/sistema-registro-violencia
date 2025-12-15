/**
 * ========================================
 * MÓDULO DE LOGGING SEGURO
 * ========================================
 * Sistema de logs que protege informações sensíveis
 * ========================================
 */

(function() {
  'use strict';

  const Logger = {
    
    /**
     * Verifica se debug está ativo
     * @returns {boolean}
     */
    isDebugMode: function() {
      return (window.CONFIG && window.CONFIG.DEBUG_MODE) || false;
    },
    
    /**
     * Sanitiza dados para log
     * @param {*} data - Dados a sanitizar
     * @returns {*} Dados sanitizados
     */
    sanitize: function(data) {
      if (window.Security && window.Security.sanitizeForLog) {
        return window.Security.sanitizeForLog(data);
      }
      
      // Fallback básico
      if (typeof data === 'string') {
        return data.replace(/https:\/\/script\.google\.com\/macros\/s\/[^\/]+/g, '[REDACTED_URL]')
                   .replace(/AKfyc[a-zA-Z0-9_-]+/g, '[REDACTED_ID]');
      }
      
      return data;
    },
    
    /**
     * Log seguro (só loga se debug estiver ativo)
     * @param {string} message - Mensagem
     * @param {*} data - Dados (opcional)
     */
    log: function(message, data) {
      if (!this.isDebugMode()) {
        return;
      }
      
      const sanitizedData = data !== undefined ? this.sanitize(data) : undefined;
      
      if (sanitizedData !== undefined) {
        console.log(`[LOG] ${message}`, sanitizedData);
      } else {
        console.log(`[LOG] ${message}`);
      }
    },
    
    /**
     * Log de erro (sempre loga, mas sanitiza)
     * @param {string} message - Mensagem
     * @param {Error|*} error - Erro ou dados
     */
    error: function(message, error) {
      const sanitizedError = error !== undefined ? this.sanitize(error) : undefined;
      
      if (sanitizedError !== undefined) {
        console.error(`[ERROR] ${message}`, sanitizedError);
      } else {
        console.error(`[ERROR] ${message}`);
      }
    },
    
    /**
     * Log de aviso (sempre loga, mas sanitiza)
     * @param {string} message - Mensagem
     * @param {*} data - Dados (opcional)
     */
    warn: function(message, data) {
      const sanitizedData = data !== undefined ? this.sanitize(data) : undefined;
      
      if (sanitizedData !== undefined) {
        console.warn(`[WARN] ${message}`, sanitizedData);
      } else {
        console.warn(`[WARN] ${message}`);
      }
    },
    
    /**
     * Log de informação (só se debug estiver ativo)
     * @param {string} message - Mensagem
     * @param {*} data - Dados (opcional)
     */
    info: function(message, data) {
      if (!this.isDebugMode()) {
        return;
      }
      
      const sanitizedData = data !== undefined ? this.sanitize(data) : undefined;
      
      if (sanitizedData !== undefined) {
        console.info(`[INFO] ${message}`, sanitizedData);
      } else {
        console.info(`[INFO] ${message}`);
      }
    },
    
    /**
     * Log de sucesso (só se debug estiver ativo)
     * @param {string} message - Mensagem
     * @param {*} data - Dados (opcional)
     */
    success: function(message, data) {
      if (!this.isDebugMode()) {
        return;
      }
      
      const sanitizedData = data !== undefined ? this.sanitize(data) : undefined;
      
      if (sanitizedData !== undefined) {
        console.log(`[SUCCESS] ${message}`, sanitizedData);
      } else {
        console.log(`[SUCCESS] ${message}`);
      }
    }
  };
  
  // Exportar globalmente
  if (typeof window !== 'undefined') {
    window.Logger = Logger;
  }
  
  // Exportar para módulos (se suportado)
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Logger;
  }
})();

