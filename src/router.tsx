import SignIn from './components/SignIn';
import WelcomeHeader from './components/WelcomeHeader';
import PatientDashboard from './components/PatientDashboard';
import { createBrowserRouter } from 'react-router-dom';
import LoginHeader from './LoginHeader';
import RootRedirect from './routes/RootRedirect';
import ProtectedRoute from './components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootRedirect />,
  },
  {
    path: '/signin',
    element:(<>
    <LoginHeader />
    <SignIn />
    </> ),
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <WelcomeHeader />
        <PatientDashboard />
      </ProtectedRoute>
    ),
  },
]);