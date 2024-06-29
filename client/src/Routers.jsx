import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Login = lazy(() => import('./pages/Auth/Login'));
const Loading = lazy(() => import('./components/shared/Loading'));
const Protected = lazy(() => import('./components/shared/Protected'));
const DashboardLayout = lazy(() => import('./components/layout/DashboardLayout'));
const Users = lazy(() => import('./pages/Dashboard/users/Users'));
const Home = lazy(() => import('./pages/Dashboard/home/Home'));
const Artists = lazy(() => import('./pages/Dashboard/artists/Artists'));
const SingleArtistView = lazy(() => import('./pages/Dashboard/artists/SingleArtistView'));
const Songs = lazy(() => import('./pages/Dashboard/songs/Songs'))
const SingleSongView = lazy(() => import('./pages/Dashboard/songs/SingleSongView'))

const wrapInSuspense = (element) => (

  <Suspense fallback={<Loading />}>
    {element}
  </Suspense>
);

const routers = createBrowserRouter([
  {
    path: '/',
    element: wrapInSuspense(<Login />)
  },
  {
    path: '/dashboard',
    element: (
      wrapInSuspense(
        <Protected>
          <DashboardLayout />
        </Protected>
      )
    ),
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'users',
        element: <Users />
      },
      {
        path: 'artists',
        element: <Artists />,
      },
      {
        path: 'artists/:id',
        element: <SingleArtistView />,
      },
      {
        path: 'songs',
        element: <Songs />
      },
      {
        path: 'songs/:id',
        element: <SingleSongView />
      }
    ]
  },
  {
    path: "*",
    element: <Navigate to="/" replace />
  }
]);

const Routers = () => {
  return (
    <RouterProvider router={routers} />
  );
};

export default Routers;
