import React, { Suspense, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, useLocation } from 'react-router-dom';
import routes, { type RouteConfig } from './routes';

const CANONICAL_ORIGIN = 'https://www.plaud.cn';

const CanonicalLink: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');

    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }

    const canonicalUrl = new URL(CANONICAL_ORIGIN);
    canonicalUrl.pathname = pathname;
    canonicalLink.href = canonicalUrl.toString();
  }, [pathname]);

  return null;
};

// Loading component
const PageLoading: React.FC = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
    {/* <div>Loading...</div> */}
  </div>
);
// Transform route configs to React Router format
const transformRoutes = (routeConfigs: RouteConfig[]) => {
  return routeConfigs.map(route => ({
    path: route.path,
    index: route.index,
    element: (
      <>
        <CanonicalLink />
        <Suspense fallback={<PageLoading />}>
          <route.element />
        </Suspense>
      </>
    ),
  }));
};

// Create router instance
const router = createBrowserRouter(transformRoutes(routes));

const Router: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default Router;
