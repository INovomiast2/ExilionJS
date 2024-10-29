import { Plugin } from '../types';

export interface LoggerConfig {
  level: 'debug' | 'info' | 'warn' | 'error';
  prefix?: string;
}

export class LoggerPlugin implements Plugin {
  name = 'exilon-logger';
  version = '1.0.0';

  constructor(private config: LoggerConfig) {}

  onInit() {
    console.log(`📝 Logger iniciado en nivel: ${this.config.level}`);
  }

  onError(error: Error) {
    console.error(`${this.config.prefix || '🚨'} Error:`, error);
  }
}
