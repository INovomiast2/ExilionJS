export interface PluginContext {
  name: string;
  version: string;
  isDevelopment: boolean;
}

export interface PluginHooks {
  onInit?: () => void | Promise<void>;
  onRouteChange?: (route: string) => void | Promise<void>;
  onError?: (error: Error) => void | Promise<void>;
  onBeforeRender?: () => void | Promise<void>;
  onAfterRender?: () => void | Promise<void>;
}

export interface Plugin extends PluginHooks {
  name: string;
  version: string;
  dependencies?: string[];
  options?: Record<string, any>;
}

export interface AnalyticsPluginOptions {
  trackingId: string;
  enableDebug?: boolean;
  domain?: string;
}

export interface LoggerPluginOptions {
  level: 'debug' | 'info' | 'warn' | 'error';
  prefix?: string;
  enableConsole?: boolean;
  customLevels?: Record<string, string>;
}
