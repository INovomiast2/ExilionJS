interface PluginConfig {
  enabled: boolean;
  options?: Record<string, any>;
}

export interface ExilonConfig {
  plugins: {
    analytics: PluginConfig;
    logger: PluginConfig;
    // Aquí puedes añadir más plugins
  };
}

// Configuración por defecto
export const defaultConfig: ExilonConfig = {
  plugins: {
    analytics: {
      enabled: true,
      options: {
        trackingId: 'EX-123456',
        enableDebug: true,
      }
    },
    logger: {
      enabled: true,
      options: {
        level: 'debug',
        prefix: '🔍',
      }
    }
  }
};

let currentConfig = { ...defaultConfig };

export const setConfig = (newConfig: Partial<ExilonConfig>) => {
  currentConfig = {
    ...defaultConfig,
    ...newConfig,
    plugins: {
      ...defaultConfig.plugins,
      ...newConfig.plugins,
    }
  };
};

export const getConfig = (): ExilonConfig => currentConfig;
