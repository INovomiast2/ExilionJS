/// <reference types="vite/client" />
/// <reference types="webpack-env" />

interface ImportMeta {
  glob<T = any>(
    pattern: string,
    options?: {
      eager?: boolean;
      as?: string;
      import?: string;
    }
  ): Record<string, () => Promise<T>>;
}

interface RequireContext {
  keys(): string[];
  (id: string): any;
  <T>(id: string): T;
  resolve(id: string): string;
  /** The module id of the context module. This may be useful for module.hot.accept. */
  id: string;
}

interface NodeRequire {
  context(
    directory: string,
    useSubdirectories?: boolean,
    regExp?: RegExp
  ): RequireContext;
}
