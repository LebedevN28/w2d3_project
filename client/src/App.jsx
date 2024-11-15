import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ProtectedRouter from './components/hoc/ProtectedRoute';
import Layout from './components/Layout';
import MainPage from './components/pages/MainPage';
import CardPage from './components/pages/CardPage';
import AccountLoginPage from './components/pages/AccountLoginPage';
import AccountNewPage from './components/pages/AccountNewPage';
import AllCardOneUser from './components/pages/AllCardOneUser';
import useUser from './hooks/useUser';
import AddCard from './components/ui/AddCard';
// import AddCardPage from './components/pages/AddCardPage';

function App() {
  const { logoutHandler, signInHandler, signUpHandler, user } = useUser();
  console.log(user.status);

  const router = createBrowserRouter([
    {
      element: <Layout user={user} logoutHandler={logoutHandler} />,
      errorElement: <h1>No content</h1>,
      children: [
        {
          path: '/',
          element: <MainPage user={user} />,
        },
        {
          element: <ProtectedRouter isAllowed={user.status !== 'logged'} />,
          children: [
            {
              path: '/account/new',
              element: <AccountNewPage signUpHandler={signUpHandler} />,
            },
            {
              path: '/account/login',
              element: <AccountLoginPage signInHandler={signInHandler} />,
            },
          ],
        },
        {
          element: <ProtectedRouter isAllowed={user.status === 'logged'} />,
          children: [
            {
              path: '/newiniative',
              element: <AddCard />,
            },
          ],
        },
        {
          path: `/initiatives/:initiativeId`,
          element: <CardPage />,
        },
        {
          path: '/initiatives/user/:userId',
          element: <AllCardOneUser />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
