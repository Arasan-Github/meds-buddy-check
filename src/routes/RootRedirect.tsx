import { useAuth } from '../components/context/AuthContext';
import { Navigate } from 'react-router-dom'; 

const RootRedirect = () => {
  const { session } = useAuth();

  if (session === undefined) {
    return <div>Loading...</div>;
  }

  return session?.access_token ? <Navigate to="/dashboard" /> : <Navigate to="/welcome" />; 
};

export default RootRedirect;