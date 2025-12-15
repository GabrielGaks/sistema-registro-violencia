/**
 * ========================================
 * CONFIG LOADER - Carregador Seguro de Configuração
 * ========================================
 * Carrega config.local.js se existir, mantendo compatibilidade
 * ========================================
 */

(function() {
  'use strict';
  
  // Função para carregar configuração local de forma assíncrona
  function loadLocalConfig() {
    return new Promise((resolve) => {
      // Verifica se já existe CONFIG_LOCAL (carregado por outro script)
      if (typeof window !== 'undefined' && window.CONFIG_LOCAL) {
        resolve(window.CONFIG_LOCAL);
        return;
      }
      
      // Tenta carregar config.local.js
      const script = document.createElement('script');
      script.src = 'config.local.js';
      script.type = 'text/javascript';
      script.async = false;
      
      script.onload = function() {
        // Se config.local.js foi carregado, ele define window.CONFIG_LOCAL
        if (typeof window !== 'undefined' && window.CONFIG_LOCAL) {
          resolve(window.CONFIG_LOCAL);
        } else {
          resolve(null);
        }
      };
      
      script.onerror = function() {
        // Se não encontrou config.local.js, não é erro (é opcional)
        resolve(null);
      };
      
      // Adiciona ao head para carregar
      const head = document.head || document.getElementsByTagName('head')[0];
      head.appendChild(script);
    });
  }
  
  // Carrega configuração quando o DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', async function() {
      const localConfig = await loadLocalConfig();
      if (localConfig && typeof window !== 'undefined' && window.CONFIG) {
        // Mescla configuração local com padrão (se CONFIG já foi definido)
        // Isso permite que config.local.js sobrescreva valores padrão
        Object.keys(localConfig).forEach(key => {
          if (localConfig[key]) {
            window.CONFIG[key] = localConfig[key];
          }
        });
        
        // Log apenas se debug estiver ativo
        if (window.CONFIG && window.CONFIG.DEBUG_MODE) {
          const logFn = (window.Logger && window.Logger.log) || console.log;
          logFn('✅ Configuração local carregada com sucesso');
        }
      }
    });
  } else {
    // DOM já está pronto
    loadLocalConfig().then(localConfig => {
      if (localConfig && typeof window !== 'undefined' && window.CONFIG) {
        Object.keys(localConfig).forEach(key => {
          if (localConfig[key]) {
            window.CONFIG[key] = localConfig[key];
          }
        });
        
        if (window.CONFIG && window.CONFIG.DEBUG_MODE) {
          const logFn = (window.Logger && window.Logger.log) || console.log;
          logFn('✅ Configuração local carregada com sucesso');
        }
      }
    });
  }
})();

