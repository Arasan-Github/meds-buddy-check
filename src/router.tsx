import SignIn from './components/SignIn';
import WelcomeHeader from './components/WelcomeHeader';
import PatientDashboard from './components/PatientDashboard';
import { createBrowserRouter } from 'react-router-dom';
import LoginHeader from './LoginHeader';
import RootRedirect from './routes/RootRedirect';
import ProtectedRoute from './components/ProtectedRoute';
import Onboarding from './components/Onboarding';
import Index from './pages/Index';

export const router = createBrowserRouter([
  {
    path: '/welcome',
    element: <Onboarding onComplete={function (userType: 'patient' | 'caretaker'): void {
      throw new Error('Function not implemented.');
    } }/>
  }
  ,
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
        {/* <WelcomeHeader /> */}
        {/* <Index/> */}
        <PatientDashboard />
      </ProtectedRoute>
    ),
  },
]);