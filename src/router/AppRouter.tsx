import React from 'react';
import { Logger } from '@/utils/Logger';
import { RouteMatch, RouteParams } from '@/types/router';
import { ExilonError } from '@/utils/ExilonError';
import { ERROR_CODES } from '@/utils/errorCodes';

type PageModule = {
  default: React.ComponentType;
};

export class AppRouter {
  private static instance: AppRouter;
  private routes: Map<string, RouteMatch> = new Map();
  private dynamicSegments: Set<string> = new Set();
  private initialized: boolean = false;

  private constructor() {
    this.loadRoutes();
  }

  static getInstance(): AppRouter {
    if (!AppRouter.instance) {
      AppRouter.instance = new AppRouter();
    }
    return AppRouter.instance;
  }

  private loadRoutes() {
    try {
      const pageContext = require.context('@/app', true, /page\.(tsx|ts)$/);
      const layoutContext = require.context('@/app', true, /layout\.(tsx|ts)$/);

      pageContext.keys().forEach((path) => {
        const routePath = this.convertFilePathToRoutePath(path);
        const layoutPath = this.findLayoutPath(path, layoutContext.keys());
        
        const pageModule = pageContext(path);
        const layoutModule = layoutPath ? layoutContext(layoutPath) : undefined;

        if (!pageModule.default) {
          Logger.error(`Error loading route ${routePath}: No default export found`);
          return;
        }

        this.routes.set(routePath, {
          params: this.extractParams(routePath),
          Page: pageModule.default,
          Layout: layoutModule?.default
        });

        if (routePath.includes('[') && routePath.includes(']')) {
          this.dynamicSegments.add(routePath);
          Logger.route('GET', routePath, 200);
        } else {
          Logger.route('GET', routePath, 200);
        }
      });

      this.initialized = true;
      Logger.success(`${this.routes.size} rutas cargadas`);

      // Debug: mostrar todas las rutas cargadas
      Logger.info('Rutas disponibles:');
      this.routes.forEach((_, path) => {
        Logger.info(`  ${path}`);
      });

    } catch (error) {
      Logger.error('Error al cargar las rutas:', error);
      throw error;
    }
  }

  private convertFilePathToRoutePath(filePath: string): string {
    let routePath = filePath
      .replace(/^\.\//, '')                 // Eliminar ./ inicial
      .replace(/\\/g, '/')                  // Convertir backslashes a forward slashes
      .replace(/page\.(tsx|ts)$/, '')       // Eliminar extensión
      .replace(/\/index$/, '')              // Convertir /index en /
      .replace(/\/$/, '');                  // Eliminar slash final si existe

    if (!routePath.startsWith('/')) {
      routePath = '/' + routePath;
    }

    return routePath || '/';
  }

  private findLayoutPath(pagePath: string, layoutPaths: string[]): string | undefined {
    const pathParts = pagePath.split('/');
    while (pathParts.length > 0) {
      pathParts.pop(); // Eliminar 'page.tsx'
      const layoutPath = [...pathParts, 'layout.tsx'].join('/');
      if (layoutPaths.includes(layoutPath)) {
        return layoutPath;
      }
      pathParts.pop(); // Subir un nivel
    }
    return undefined;
  }

  private extractParams(path: string): RouteParams {
    const params: RouteParams = {};
    const segments = path.split('/');
    
    segments.forEach(segment => {
      const match = segment.match(/\[([^\]]+)\]/);
      if (match) {
        const paramName = match[1];
        params[paramName] = '';
      }
    });

    return params;
  }

  matchRoute(path: string): RouteMatch | null {
    if (!this.initialized) {
      Logger.error('Router not initialized');
      return null;
    }

    // Normalizar la ruta
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;

    // Debug: mostrar la ruta que se está buscando
    Logger.info(`Buscando ruta: ${normalizedPath}`);

    // Primero intentar coincidencia exacta
    if (this.routes.has(normalizedPath)) {
      return this.routes.get(normalizedPath) || null;
    }

    // Si no hay coincidencia exacta, buscar en rutas dinámicas
    for (const pattern of this.dynamicSegments) {
      const match = this.matchDynamicPattern(normalizedPath, pattern);
      if (match) {
        const route = this.routes.get(pattern);
        if (route) {
          return {
            ...route,
            params: match.params
          };
        }
      }
    }

    // Si no se encuentra ninguna coincidencia, lanzar error 404
    ExilonError.throw({
      type: 'router',
      code: ERROR_CODES.ROUTER_PAGE_NOT_FOUND,
      message: `Ruta no encontrada: ${normalizedPath}`,
      file: 'AppRouter.tsx',
    });

    return null;
  }

  private matchDynamicPattern(path: string, pattern: string): { params: RouteParams } | null {
    const pathParts = path.split('/');
    const patternParts = pattern.split('/');

    if (pathParts.length !== patternParts.length) {
      return null;
    }

    const params: RouteParams = {};

    for (let i = 0; i < patternParts.length; i++) {
      const patternPart = patternParts[i];
      const pathPart = pathParts[i];

      const match = patternPart.match(/\[([^\]]+)\]/);
      if (match) {
        params[match[1]] = pathPart;
      } else if (patternPart !== pathPart) {
        return null;
      }
    }

    return { params };
  }

  getRoutes(): Map<string, RouteMatch> {
    return this.routes;
  }

  getAllRoutes(): string[] {
    return Array.from(this.routes.keys());
  }
}

export default AppRouter.getInstance();
