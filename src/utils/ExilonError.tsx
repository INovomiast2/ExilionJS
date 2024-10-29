import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

type ErrorType = 'build' | 'runtime' | 'router' | 'component' | 'api';

interface ErrorDetails {
  type: ErrorType;
  code: string;
  message: string;
  file?: string;
  line?: number;
  stack?: string;
}

const ErrorOverlay: React.FC<{ error: ErrorDetails; onClose: () => void }> = ({ error, onClose }) => {
  const [showStack, setShowStack] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const getErrorTheme = (type: ErrorType) => {
    switch (type) {
      case 'build': return { bg: 'bg-red-50', text: 'text-red-700', icon: '🏗️' };
      case 'runtime': return { bg: 'bg-orange-50', text: 'text-orange-700', icon: '⚡' };
      case 'router': return { bg: 'bg-purple-50', text: 'text-purple-700', icon: '🔄' };
      case 'component': return { bg: 'bg-blue-50', text: 'text-blue-700', icon: '🧩' };
      case 'api': return { bg: 'bg-yellow-50', text: 'text-yellow-700', icon: '🌐' };
      default: return { bg: 'bg-gray-50', text: 'text-gray-700', icon: '❌' };
    }
  };

  const theme = getErrorTheme(error.type);

  const copyErrorDetails = () => {
    const errorDetails = `
Exilon Error Report
------------------
Type: ${error.type}
Code: ${error.code}
Message: ${error.message}
File: ${error.file}${error.line ? `:${error.line}` : ''}
${error.stack ? `\nStack Trace:\n${error.stack}` : ''}
    `.trim();

    navigator.clipboard.writeText(errorDetails);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 font-mono z-50">
      <div className={`max-w-3xl w-full rounded-lg shadow-lg ${theme.bg} p-6`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{theme.icon}</span>
            <div>
              <h2 className={`text-xl font-bold ${theme.text}`}>
                Exilon Error: {error.type.charAt(0).toUpperCase() + error.type.slice(1)}
              </h2>
              <p className="text-sm text-gray-500">Press ESC to close</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="bg-white rounded p-4 mb-4 shadow-sm">
          <p className={`font-bold ${theme.text} mb-2 font-mono`}>
            [{error.code}] {error.message}
          </p>
          {error.file && (
            <p className="text-gray-600 flex items-center gap-2">
              <span>📁</span>
              <code className="bg-gray-100 px-2 py-1 rounded">
                {error.file}{error.line ? `:${error.line}` : ''}
              </code>
            </p>
          )}
        </div>

        {error.stack && (
          <div className="mb-4">
            <button
              onClick={() => setShowStack(!showStack)}
              className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
            >
              <span>{showStack ? '📕' : '📖'}</span>
              {showStack ? 'Hide' : 'Show'} Stack Trace
            </button>
            {showStack && (
              <div className="mt-2 bg-gray-900 text-gray-300 p-4 rounded overflow-x-auto">
                <pre className="text-sm">{error.stack}</pre>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between items-center mt-4">
          <a 
            href={`https://docs.exilon.dev/errors/${error.code}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-2"
          >
            <span>💡</span>
            Learn more
          </a>
          <button
            onClick={copyErrorDetails}
            className={`px-3 py-1 rounded transition-colors ${
              copied 
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {copied ? '✓ Copied' : '📋 Copy Error'}
          </button>
        </div>
      </div>
    </div>
  );
};

export class ExilonError extends Error {
  private details: ErrorDetails;

  constructor(details: ErrorDetails) {
    super(details.message);
    this.details = details;
    this.name = 'ExilonError';

    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      // Aseguramos que el DOM esté listo
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
          this.showErrorOverlay();
        });
      } else {
        this.showErrorOverlay();
      }
    }
  }

  private showErrorOverlay = () => {
    const existingOverlay = document.getElementById('exilon-error-overlay');
    if (existingOverlay) {
      existingOverlay.remove();
    }

    const errorRoot = document.createElement('div');
    errorRoot.id = 'exilon-error-overlay';
    document.body.appendChild(errorRoot);

    const root = ReactDOM.createRoot(errorRoot);
    root.render(
      <React.StrictMode>
        <ErrorOverlay 
          error={this.details} 
          onClose={() => errorRoot.remove()}
        />
      </React.StrictMode>
    );
  };

  static throw(details: ErrorDetails): never {
    throw new ExilonError(details);
  }
}
