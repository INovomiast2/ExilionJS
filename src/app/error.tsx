import React from 'react';

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-red-50 border-l-4 border-red-500 p-8 rounded-lg max-w-2xl w-full">
        <h2 className="text-2xl font-bold text-red-700 mb-4">¡Algo salió mal!</h2>
        <p className="text-red-600 mb-4">{error.message}</p>
        <button
          onClick={reset}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  );
}
