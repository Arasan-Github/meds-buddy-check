import SignIn from './components/SignIn';
import WelcomeHeader from './components/WelcomeHeader';
import PatientDashboard from './components/PatientDashboard';
import { createBrowserRouter } from 'react-router-dom';
import LoginHeader from './LoginHeader';

export const router = createBrowserRouter([
  {
    path: '/',
    element:(<>
    <LoginHeader />
    <SignIn />
    </> ),
  },
  {
    path: '/dashboard',
    element: (
      <>
        <WelcomeHeader />
        <PatientDashboard />
      </>
    ),
  },
]);