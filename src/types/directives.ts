export type DirectiveType = 'use client' | 'use server' | 'use strict';

export interface FileDirectives {
  client?: boolean;
  server?: boolean;
  strict?: boolean;
}

export function parseDirectives(content: string): FileDirectives {
  const directives: FileDirectives = {};
  const lines = content.split('\n');
  
  // Buscar directivas en las primeras líneas
  for (const line of lines.slice(0, 3)) {
    if (line.includes('client')) directives.client = true;
    if (line.includes('server')) directives.server = true;
    if (line.includes('strict')) directives.strict = true;
  }
  
  return directives;
} 