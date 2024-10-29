import { ComponentType } from 'react';

export interface RouteParams {
  [key: string]: string;
}

export interface LayoutProps {
  children: React.ReactNode;
}

export interface RouteMatch {
  params: RouteParams;
  Page: ComponentType;
  Layout?: ComponentType<LayoutProps>;
}

export interface RouterContextType {
  currentPath: string;
  navigate: (path: string) => void;
  params?: RouteParams;
}

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  replace?: boolean;
  prefetch?: boolean;
}
