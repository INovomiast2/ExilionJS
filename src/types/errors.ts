export type ErrorType = 'build' | 'runtime' | 'router' | 'component' | 'api';

export interface ErrorDetails {
  type: ErrorType;
  code: string;
  message: string;
  file?: string;
  line?: number;
  stack?: string;
}

export interface ErrorComponentProps {
  error: Error;
  reset: () => void;
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback: React.ComponentType<ErrorComponentProps>;
}
