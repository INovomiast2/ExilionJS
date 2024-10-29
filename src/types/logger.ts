export type LogLevel = 'info' | 'warn' | 'error' | 'debug' | 'ready' | 'event' | 'wait';

export interface LogStyles {
  badge: string[];
  text: string[];
}

export interface LoggerOptions {
  level: LogLevel;
  timestamp?: boolean;
  prefix?: string;
  colors?: boolean;
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  metadata?: Record<string, any>;
}
