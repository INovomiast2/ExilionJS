import chalk from 'chalk';
import path from 'path';
import fs from 'fs';
import gradient from 'gradient-string';

const styles = {
  // Gradientes personalizados
  headerGradient: (text) => gradient(['#3B82F6', '#8B5CF6'])(text),
  successGradient: (text) => gradient(['#10B981', '#34D399'])(text),
  errorGradient: (text) => gradient(['#EF4444', '#F87171'])(text),
  
  // Colores principales
  primary: chalk.hex('#3B82F6'),
  secondary: chalk.hex('#8B5CF6'),
  success: chalk.hex('#10B981'),
  warning: chalk.hex('#F59E0B'),
  error: chalk.hex('#EF4444'),
  info: chalk.hex('#6B7280'),
  dim: chalk.hex('#9CA3AF'),
  accent: chalk.hex('#60A5FA'),

  // Símbolos modernos
  symbols: {
    arrow: '›',
    bullet: '•',
    check: '✓',
    cross: '✕',
    warning: '△',
    info: 'ℹ',
    star: '★',
    spark: '✧',
    bolt: '⚡',
    heart: '♥',
    cube: '◼',
    circle: '◆',
    square: '■',
    play: '▶',
    diamond: '❖',
    dot: '·',
  }
};

// Banner ASCII art con el logo especial
const BANNER = `
    ███████╗██╗  ██╗██╗██╗      ██████╗ ███╗   ██╗
    ██╔════╝╚██╗██╔╝██║██║     ██╔═══██╗████╗  ██║
    █████╗   ╚███╔╝ ██║██║     ██║   ██║██╔██╗ ██║
    ██╔══╝   ██╔██╗ ██║██║     ██║   ██║██║╚██╗██║
    ███████╗██╔╝ ██╗██║███████╗╚██████╔╝██║ ╚████║
    ╚══════╝╚═╝  ╚═╝╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═══╝
`.replace(/A/g, '⚡'); // Reemplazar 'A' con el logo especial

// Logger mejorado y más estilizado
export const Logger = {
  info: (message) => console.log(`${styles.info(styles.symbols.info)} ${styles.info(message)}`),
  success: (message) => console.log(`${styles.success(styles.symbols.check)} ${styles.success(message)}`),
  error: (message, details) => {
    console.log(`${styles.error(styles.symbols.cross)} ${styles.error(message)}`);
    if (details) {
      console.log(`   ${styles.error(styles.symbols.arrow)} ${styles.dim(details)}`);
    }
  },
  warning: (message) => console.log(`${styles.warning(styles.symbols.warning)} ${styles.warning(message)}`),
  warn: (message) => console.log(`${styles.warning(styles.symbols.warning)} ${styles.warning(message)}`),
  wait: (message) => console.log(`${styles.primary(styles.symbols.circle)} ${styles.primary(message)}`),
  route: (method, path, status = 200) => {
    const color = status >= 400 ? styles.error : 
                 status >= 300 ? styles.warning : 
                 styles.success;
    
    const methodColor = {
      'GET': styles.success,
      'POST': styles.primary,
      'PUT': styles.warning,
      'DELETE': styles.error,
      'PATCH': styles.secondary,
      'PAGE': styles.info,
      'LAYOUT': styles.accent
    };

    const symbol = method === 'LAYOUT' ? styles.symbols.diamond :
                  method === 'PAGE' ? styles.symbols.bullet :
                  styles.symbols.arrow;

    // Formatear el método con color y padding
    const formattedMethod = (methodColor[method] || styles.dim)(method.padEnd(7));
    
    console.log(`${formattedMethod} ${color(symbol)} ${styles.info(path)}`);
  },
  group: (label) => {
    if (label) {
      const line = styles.dim('═'.repeat(process.stdout.columns - label.length - 4));
      console.log('\n' + styles.headerGradient(label) + ' ' + line);
    }
  },
  groupEnd: () => console.log(''),
  
  // Nuevo método para mostrar estadísticas
  stats: (stats) => {
    const { total, success, warning, error } = stats;
    const width = 40;
    const successWidth = Math.floor((success / total) * width);
    const warningWidth = Math.floor((warning / total) * width);
    const errorWidth = Math.floor((error / total) * width);

    console.log('\n' + styles.dim('Statistics:'));
    console.log(
      styles.success('✔️'.repeat(successWidth)) +
      styles.warning('⚠️'.repeat(warningWidth)) +
      styles.error('❌'.repeat(errorWidth)) +
      styles.dim('█'.repeat(width - successWidth - warningWidth - errorWidth))
    );
    console.log(
      `${styles.success(`✓ ${success}`)} ${styles.dim('/')} ` +
      `${styles.warning(`△ ${warning}`)} ${styles.dim('/')} ` +
      `${styles.error(`✕ ${error}`)} ${styles.dim(`de ${total} total`)}`
    );
  }
};

class ExilonWebpackPlugin {
  constructor(options = {}) {
    this.options = options;
    this.routes = new Map();
    this.stats = {
      total: 0,
      success: 0,
      warning: 0,
      error: 0,
      routes: {
        static: 0,
        dynamic: 0,
        layout: 0
      }
    };
  }

  apply(compiler) {
    compiler.hooks.beforeCompile.tap('ExilonWebpackPlugin', () => {
      this.showBanner();
      this.scanRoutes(compiler.context);
    });

    compiler.hooks.done.tap('ExilonWebpackPlugin', (stats) => {
      const time = stats.endTime - stats.startTime;
      
      if (stats.hasErrors()) {
        Logger.error('500 - Failed Compilation');
        stats.compilation.errors.forEach(error => {
          Logger.error(error.message);
        });
        return;
      }

      Logger.success(`Compilación completada en ${time}ms`);
      this.showRoutes();
    });
  }

  scanRoutes(context) {
    try {
      const appDir = path.join(context, 'src', 'app');
      if (!fs.existsSync(appDir)) {
        Logger.error(`500 - App directory not found!`);
        return;
      }

      this.routes.clear();
      this.scanDirectory(appDir, '');
    } catch (error) {
      Logger.error('Error scaning routes:', error.message);
    }
  }

  scanDirectory(dir, routePath) {
    try {
      const items = fs.readdirSync(dir);
      const hasPage = items.includes('page.tsx');
      const hasLayout = items.includes('layout.tsx');
      
      if (hasPage) {
        const normalizedPath = this.normalizeRoutePath(routePath);
        const isDynamic = normalizedPath.includes('[');
        
        // Registrar la ruta con el método correcto
        if (isDynamic) {
          Logger.route('GET', normalizedPath);
        } else {
          Logger.route('GET', normalizedPath);
        }
        
        this.routes.set(normalizedPath, {
          path: normalizedPath,
          isDynamic,
          hasLayout
        });
      }

      // Escanear subdirectorios
      items.forEach(item => {
        const fullPath = path.join(dir, item);
        if (fs.statSync(fullPath).isDirectory()) {
          if (!item.startsWith('_') && !item.startsWith('.')) {
            const newRoutePath = routePath ? path.join(routePath, item) : item;
            this.scanDirectory(fullPath, newRoutePath);
          }
        }
      });
    } catch (error) {
      Logger.error(`Error scanning ${dir}:`, error.message);
    }
  }

  normalizeRoutePath(routePath) {
    if (!routePath) return '/';
    
    let normalized = '/' + routePath
      .replace(/\\/g, '/')        // Convertir backslashes a forward slashes
      .replace(/^\/+|\/+$/g, '')  // Eliminar slashes extra al inicio y final
      .replace(/\/index$/, '');   // Eliminar /index del final
    
    return normalized || '/';
  }

  showBanner() {
    console.clear();
    
    // Banner principal con gradiente
    console.log(styles.headerGradient(BANNER));
    
    // Marco decorativo
    const frameWidth = 60;
    const version = process.env.npm_package_version || '1.0.0';
    const mode = process.env.NODE_ENV || 'development';

    // Línea superior
    console.log(styles.primary('╭' + '─'.repeat(frameWidth - 2) + '╮'));
    
    // Contenido
    [
      `${styles.symbols.bolt} With great power comes great responsibility ${styles.symbols.bolt}`,
      `${styles.symbols.info} Version: ${version}`,
      `${styles.symbols.diamond} Mode: ${mode}`,
      `${styles.symbols.spark} Ready to rock! ${styles.symbols.spark}`
    ].forEach(line => {
      const padding = Math.max(0, frameWidth - line.length - 4);
      console.log(
        styles.primary('│') + 
        ' ' + 
        styles.info(line) + 
        ' '.repeat(padding) + 
        ' ' + 
        styles.primary('│')
      );
    });
    
    // Línea inferior
    console.log(styles.primary('╰' + '─'.repeat(frameWidth - 2) + '╯'));
    console.log('');
  }

  printSeparator(isBottom = false) {
    const width = 60;
    const char = isBottom ? styles.box.horizontal : styles.box.horizontal;
    console.log(styles.dim(char.repeat(width)));
  }

  printSuccessReport(time) {
    const message = `Successful compilation in ${time}ms`;
    console.log('\n' + styles.successGradient(styles.symbols.check + ' ' + message));
  }

  printErrorReport(errors) {
    console.log('\n' + styles.errorGradient(styles.symbols.cross + ' Failed Compilation'));
    errors.forEach(error => {
      console.log(styles.error(`  ${styles.symbols.arrow} ${error.message}`));
    });
  }

  printAssets(assets) {
    const assetList = Object.entries(assets)
      .map(([name, asset]) => ({ name, size: asset.size() }))
      .sort((a, b) => b.size - a.size);

    if (assetList.length > 0) {
      console.log('\n' + styles.headerGradient('Generated Assets:'));
      assetList.forEach(({ name, size }) => {
        const sizeStr = this.formatSize(size).padStart(8);
        console.log(`  ${styles.dim(sizeStr)} ${styles.symbols.arrow} ${styles.info(name)}`);
      });
    }
  }

  showRoutes() {
    const routes = Array.from(this.routes.entries());
    
    if (routes.length === 0) {
      Logger.warning('No routes found');
      return;
    }

    Logger.group('Detected Routes');

    // Separar rutas por tipo
    const staticRoutes = routes.filter(([_, info]) => !info.isDynamic);
    const dynamicRoutes = routes.filter(([_, info]) => info.isDynamic);
    const layoutRoutes = routes.filter(([_, info]) => info.hasLayout);

    // Mostrar rutas estáticas
    if (staticRoutes.length > 0) {
      console.log(styles.primary('\nStatic Routes:'));
      staticRoutes.forEach(([path]) => {
        Logger.route('GET', path);
      });
    }

    // Mostrar rutas dinámicas
    if (dynamicRoutes.length > 0) {
      console.log(styles.primary('\nDynamic Routes:'));
      dynamicRoutes.forEach(([path]) => {
        Logger.route('GET', path);
      });
    }

    // Mostrar rutas con layout
    if (layoutRoutes.length > 0) {
      console.log(styles.primary('\nLayout Files:'));
      layoutRoutes.forEach(([path]) => {
        Logger.route('LAYOUT', path);
      });
    }

    // Mostrar estadísticas
    console.log(styles.dim('\nStatistics:'));
    console.log(styles.info(`${styles.symbols.arrow} Total: ${routes.length}`));
    console.log(styles.info(`${styles.symbols.arrow} Static: ${staticRoutes.length}`));
    console.log(styles.info(`${styles.symbols.arrow} Dynamic: ${dynamicRoutes.length}`));
    console.log(styles.info(`${styles.symbols.arrow} Layout: ${layoutRoutes.length}`));

    Logger.groupEnd();
  }

  formatSize(bytes) {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    return `${size.toFixed(2)} ${units[unitIndex]}`;
  }
}

export default ExilonWebpackPlugin;
