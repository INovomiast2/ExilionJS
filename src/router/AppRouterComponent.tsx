import React, { Suspense, useEffect, useState } from 'react';
import { useRouter } from './RouterContext';
import { AppRouter } from './AppRouter';
import Loading from '../../to_create/app/loading';
import ErrorPage from '../../to_create/app/error';
import RootLayout from '../../to_create/app/layout';

interface RouteState {
  Component: React.ComponentType<any>;
  params: Record<string, string>;
}

export const AppRouterComponent: React.FC = () => {
  const { currentPath } = useRouter();
  const [routeState, setRouteState] = useState<RouteState | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      const router = AppRouter.getInstance();
      const match = router.matchRoute(currentPath);
      
      if (match) {
        const { Page, params } = match;
        setRouteState({
          Component: Page,
          params: params
        });
        setError(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error desconocido'));
      setRouteState(null);
    }
  }, [currentPath]);

  // Debug: muestra información sobre la ruta actual
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('🛣️ Ruta actual:', {
        path: currentPath,
        params: routeState?.params,
        hasComponent: !!routeState?.Component
      });
    }
  }, [currentPath, routeState]);

  if (error) {
    return (
      <RootLayout>
        <ErrorPage 
          error={error} 
          reset={() => window.location.href = '/'}
        />
      </RootLayout>
    );
  }

  if (!routeState) {
    return (
      <RootLayout>
        <Loading />
      </RootLayout>
    );
  }

  const { Component, params } = routeState;

  return (
    <RootLayout>
      <Suspense fallback={<Loading />}>
        <Component params={params} />
      </Suspense>
    </RootLayout>
  );
};
