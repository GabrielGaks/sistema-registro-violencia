/**
 * ========================================
 * MÓDULO DE API
 * ========================================
 * Centraliza todas as chamadas de API com segurança
 * ========================================
 */

(function() {
  'use strict';

  const API = {
    
    /**
     * Faz requisição segura para Apps Script
     * @param {string} url - URL do Apps Script
     * @param {Object} data - Dados a enviar
     * @param {Object} options - Opções adicionais
     * @returns {Promise<Object>} Resposta da API
     */
    request: async function(url, data, options = {}) {
      // Validações de segurança
      if (!url || typeof url !== 'string') {
        throw new Error('URL inválida');
      }
      
      if (!window.Security) {
        console.warn('⚠️ Módulo Security não carregado. Carregue security.js primeiro.');
      }
      
      // Sanitiza dados antes de enviar
      const sanitizedData = window.Security ? window.Security.sanitizeObject(data || {}) : data;
      
      // Valida URL
      if (!window.Security || !window.Security.validateURL(url)) {
        throw new Error('URL inválida ou insegura');
      }
      
      // Configuração padrão
      const config = {
        method: options.method || 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow',
        ...options
      };
      
      // Prepara body
      if (config.method === 'POST' || config.method === 'PUT') {
        config.body = 'data=' + encodeURIComponent(JSON.stringify(sanitizedData));
      }
      
      // Timeout
      const timeout = (window.CONFIG && window.CONFIG.REQUEST_TIMEOUT) || 30000;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      config.signal = controller.signal;
      
      try {
        // Faz requisição
        const response = await fetch(url, config);
        clearTimeout(timeoutId);
        
        // Verifica status
        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status} ${response.statusText}`);
        }
        
        // Lê resposta
        const responseText = await response.text();
        
        // Tenta parsear JSON
        let resultado;
        try {
          resultado = JSON.parse(responseText);
        } catch (parseError) {
          // Se não for JSON, pode ser HTML (erro do servidor)
          if (responseText.trim().startsWith('<!DOCTYPE') || responseText.trim().startsWith('<html')) {
            throw new Error('Resposta do servidor não é JSON. Verifique se o Apps Script está configurado corretamente.');
          }
          throw new Error('Resposta inválida do servidor');
        }
        
        // Sanitiza resposta antes de retornar
        return window.Security ? window.Security.sanitizeObject(resultado) : resultado;
        
      } catch (error) {
        clearTimeout(timeoutId);
        
        if (error.name === 'AbortError') {
          throw new Error('Timeout: A requisição demorou muito para responder');
        }
        
        throw error;
      }
    },
    
    /**
     * Login
     * @param {string} email - Email do usuário
     * @param {string} password - Senha
     * @returns {Promise<Object>} Resultado do login
     */
    login: async function(email, password) {
      if (!window.Security) {
        throw new Error('Módulo Security não carregado');
      }
      
      // Validações
      if (!window.Security.validateEmail(email)) {
        throw new Error('Email inválido');
      }
      
      if (!password || password.length < 1) {
        throw new Error('Senha não pode estar vazia');
      }
      
      // Sanitiza
      const sanitizedEmail = window.Security.sanitizeString(email);
      
      // Obtém URL do config
      const url = (window.CONFIG && window.CONFIG.APPS_SCRIPT_AUTH) || '';
      if (!url) {
        throw new Error('URL de autenticação não configurada');
      }
      
      // Faz requisição
      return await this.request(url, {
        action: 'login',
        email: sanitizedEmail,
        password: password // Senha não é sanitizada (pode conter caracteres especiais)
      });
    },
    
    /**
     * Salva caso
     * @param {Object} casoData - Dados do caso
     * @returns {Promise<Object>} Resultado
     */
    saveCase: async function(casoData) {
      if (!window.Security) {
        throw new Error('Módulo Security não carregado');
      }
      
      // Sanitiza dados do caso
      const sanitizedData = window.Security.sanitizeObject(casoData);
      
      // Obtém URL do config
      const url = (window.CONFIG && window.CONFIG.APPS_SCRIPT_CASOS) || '';
      if (!url) {
        throw new Error('URL de casos não configurada');
      }
      
      // Faz requisição
      return await this.request(url, {
        action: 'salvar',
        ...sanitizedData
      });
    },
    
    /**
     * Atualiza caso
     * @param {number} linha - Linha do caso
     * @param {Object} casoData - Dados atualizados
     * @returns {Promise<Object>} Resultado
     */
    updateCase: async function(linha, casoData) {
      if (!window.Security) {
        throw new Error('Módulo Security não carregado');
      }
      
      // Valida linha
      const linhaNum = parseInt(linha, 10);
      if (isNaN(linhaNum) || linhaNum < 1) {
        throw new Error('Linha inválida');
      }
      
      // Sanitiza dados
      const sanitizedData = window.Security.sanitizeObject(casoData);
      
      // Obtém URL do config
      const url = (window.CONFIG && window.CONFIG.APPS_SCRIPT_CASOS) || '';
      if (!url) {
        throw new Error('URL de casos não configurada');
      }
      
      // Faz requisição
      return await this.request(url, {
        action: 'atualizar',
        linha: linhaNum,
        ...sanitizedData
      });
    },
    
    /**
     * Deleta caso
     * @param {number} linha - Linha do caso
     * @returns {Promise<Object>} Resultado
     */
    deleteCase: async function(linha) {
      // Valida linha
      const linhaNum = parseInt(linha, 10);
      if (isNaN(linhaNum) || linhaNum < 1) {
        throw new Error('Linha inválida');
      }
      
      // Obtém URL do config
      const url = (window.CONFIG && window.CONFIG.APPS_SCRIPT_CASOS) || '';
      if (!url) {
        throw new Error('URL de casos não configurada');
      }
      
      // Faz requisição
      return await this.request(url, {
        action: 'deletar',
        linha: linhaNum
      });
    },
    
    /**
     * Lista casos
     * @param {Object} filters - Filtros (opcional)
     * @returns {Promise<Array>} Lista de casos
     */
    listCases: async function(filters = {}) {
      // Obtém URL do config
      const url = (window.CONFIG && window.CONFIG.APPS_SCRIPT_CASOS) || '';
      if (!url) {
        throw new Error('URL de casos não configurada');
      }
      
      // Sanitiza filtros
      const sanitizedFilters = window.Security ? window.Security.sanitizeObject(filters) : filters;
      
      // Faz requisição
      return await this.request(url, {
        action: 'listar',
        ...sanitizedFilters
      });
    },
    
    /**
     * Faz requisição genérica com validação de segurança
     * @param {string} endpoint - Endpoint (auth ou casos)
     * @param {Object} data - Dados
     * @param {Object} options - Opções
     * @returns {Promise<Object>} Resposta
     */
    call: async function(endpoint, data, options = {}) {
      let url;
      
      if (endpoint === 'auth') {
        url = (window.CONFIG && window.CONFIG.APPS_SCRIPT_AUTH) || '';
      } else if (endpoint === 'casos') {
        url = (window.CONFIG && window.CONFIG.APPS_SCRIPT_CASOS) || '';
      } else {
        throw new Error('Endpoint inválido. Use "auth" ou "casos"');
      }
      
      if (!url) {
        throw new Error(`URL de ${endpoint} não configurada`);
      }
      
      return await this.request(url, data, options);
    }
  };
  
  // Exportar globalmente
  if (typeof window !== 'undefined') {
    window.API = API;
  }
  
  // Exportar para módulos (se suportado)
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = API;
  }
})();

