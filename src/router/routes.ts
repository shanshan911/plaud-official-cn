import {  lazy } from 'react';
import type { ComponentType } from 'react';

// Custom route config type
export interface RouteConfig {
  path: string;
  element: ComponentType;
  index?: boolean;
}

// Dynamic import page components
const Home = lazy(() => import('../pages/Home/index'));
const ProductIntroduction = lazy(() => import('../pages/ProductIntroduction/index'));
const PrivacyPolicy = lazy(() => import('../pages/PrivacyPolicy/index'));

export const routes: RouteConfig[] = [
  {
    path: '/',
    element: Home,
    index: true,
  },
  {
    path: '/product-introduction',
    element: ProductIntroduction,
  },
  {
    path: '/privacy-policy',
    element: PrivacyPolicy,
  },
];

export default routes;
