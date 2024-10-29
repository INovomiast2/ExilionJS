import { Plugin, PluginContext, PluginHooks } from './types';
import { ExilonError } from '@/utils/ExilonError';
import { ERROR_CODES } from '@/utils/errorCodes';
import { Logger } from '@/utils/Logger';
import { getConfig } from './config';

type HookParameters<T> = T extends (...args: infer P) => any ? P : never;

export class PluginManager {
  private static instance: PluginManager;
  private plugins: Map<string, Plugin> = new Map();
  private enabledPlugins: Set<string> = new Set();
  private context: PluginContext;
  private lastPath: string = window.location.pathname;
  private lastNavigationTime: number = Date.now();

  private constructor() {
    try {
      this.context = {
        name: 'Exilon',
        version: '1.0.0',
        isDevelopment: window?.process?.env?.NODE_ENV === 'development' || false,
      };
    } catch (error) {
      ExilonError.throw({
        type: 'runtime',
        code: ERROR_CODES.RUNTIME_PLUGIN_DEPENDENCY,
        message: 'Error al inicializar el contexto del PluginManager',
        file: 'PluginManager.ts',
        line: 16,
        stack: error instanceof Error ? error.stack : undefined,
      });
    }
  }

  static getInstance(): PluginManager {
    if (!PluginManager.instance) {
      PluginManager.instance = new PluginManager();
    }
    return PluginManager.instance;
  }

  register(plugin: Plugin): void {
    if (this.plugins.has(plugin.name)) {
      ExilonError.throw({
        type: 'runtime',
        code: ERROR_CODES.RUNTIME_PLUGIN_DUPLICATE,
        message: `El plugin "${plugin.name}" ya está registrado`,
        file: 'PluginManager.ts',
      });
    }

    const config = getConfig();
    const pluginConfig = config.plugins[plugin.name as keyof typeof config.plugins];

    if (!pluginConfig) {
      Logger.warn(`Plugin "${plugin.name}" no tiene configuración definida`);
      return;
    }

    this.plugins.set(plugin.name, plugin);

    if (pluginConfig.enabled) {
      this.enabledPlugins.add(plugin.name);
      Logger.plugin(plugin.name, `Plugin registrado y activado v${plugin.version}`);
    } else {
      Logger.plugin(plugin.name, `Plugin registrado pero desactivado v${plugin.version}`);
    }
  }

  enablePlugin(name: string): void {
    const plugin = this.plugins.get(name);
    if (!plugin) {
      ExilonError.throw({
        type: 'runtime',
        code: ERROR_CODES.RUNTIME_PLUGIN_DEPENDENCY,
        message: `El plugin "${name}" no está registrado`,
        file: 'PluginManager.ts',
      });
    }
    this.enabledPlugins.add(name);
    Logger.plugin(name, 'Plugin activado');
  }

  disablePlugin(name: string): void {
    const plugin = this.plugins.get(name);
    if (!plugin) {
      ExilonError.throw({
        type: 'runtime',
        code: ERROR_CODES.RUNTIME_PLUGIN_DEPENDENCY,
        message: `El plugin "${name}" no está registrado`,
        file: 'PluginManager.ts',
      });
    }
    this.enabledPlugins.delete(name);
    Logger.plugin(name, 'Plugin desactivado');
  }

  isPluginEnabled(name: string): boolean {
    return this.enabledPlugins.has(name);
  }

  async executeHook<T extends keyof PluginHooks>(
    hookName: T,
    ...args: HookParameters<NonNullable<PluginHooks[T]>>
  ): Promise<void> {
    for (const [name, plugin] of Array.from(this.plugins.entries())) {
      if (!this.enabledPlugins.has(name)) continue;

      const hook = plugin[hookName];
      if (hook && typeof hook === 'function') {
        try {
          Logger.debug(`Ejecutando hook "${hookName}" para plugin "${plugin.name}"`);
          await hook.call(plugin, ...args);
        } catch (error) {
          Logger.error(`Error en plugin ${plugin.name}: ${error}`);
        }
      }
    }
  }

  getPlugin<T extends Plugin>(name: string): T | undefined {
    return this.plugins.get(name) as T | undefined;
  }

  getAllPlugins(): Plugin[] {
    return Array.from(this.plugins.values());
  }

  getEnabledPlugins(): Plugin[] {
    return Array.from(this.plugins.entries())
      .filter(([name]) => this.enabledPlugins.has(name))
      .map(([_, plugin]) => plugin);
  }

  subscribeToRouteChanges(): () => void {
    const handleRouteChange = async () => {
      const currentPath = window.location.pathname;
      if (currentPath !== this.lastPath) {
        const navigationTime = Date.now() - this.lastNavigationTime;
        
        // Ejecutar hook de cambio de ruta para plugins activos
        await this.executeHook('onRouteChange', currentPath);
        
        // Log de navegación
        Logger.route(currentPath, `Navegación desde ${this.lastPath} (${navigationTime}ms)`);
        
        this.lastPath = currentPath;
        this.lastNavigationTime = Date.now();
      }
    };

    // Observar cambios en el DOM para detectar navegación
    const observer = new MutationObserver(() => {
      handleRouteChange();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Manejar navegación con popstate
    window.addEventListener('popstate', handleRouteChange);

    // Retornar función de limpieza
    return () => {
      observer.disconnect();
      window.removeEventListener('popstate', handleRouteChange);
    };
  }
}
