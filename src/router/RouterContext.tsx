import React, { createContext, useContext, useState, useEffect } from 'react';
import AppRouter from './AppRouter';
import { RouterContextType } from '@/types/router';

const RouterContext = createContext<RouterContextType>({
  currentPath: '/',
  navigate: () => {},
});

export function RouterProvider({ children }: { children?: React.ReactNode }) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  const route = AppRouter.matchRoute(currentPath);
  if (!route) return null;

  const { Page, Layout } = route;

  const content = (
    <Page />
  );

  return (
    <RouterContext.Provider value={{ currentPath, navigate, params: route.params }}>
      {Layout ? (
        <Layout>
          {content}
        </Layout>
      ) : content}
    </RouterContext.Provider>
  );
}

export const useRouter = () => useContext(RouterContext);
