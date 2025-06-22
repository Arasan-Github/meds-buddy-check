import { Heart } from 'lucide-react'
import { useAuth } from './context/AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const WelcomeHeader = () => {
  const { signOut } = useAuth();
    const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSignOut = async (e) => {
    e.preventDefault();

    const { success, error } = await signOut();
     if (success) {
      navigate("/signin");
    } else {
      setError(error);
    }
  }

  return (
    <div className="text-center mb-12">
      <button aria-label="Sign out of your account" className="signout-button" onClick={handleSignOut}>
            Sign out
          </button>
          {error && (
            <div role="role" className="error-message" id="signout-error">
              {error}
            </div>
          )}
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Welcome to MediCare Companion
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your trusted partner in medication management. Choose your role to get started with personalized features.
          </p>
        </div>
  )
}

export default WelcomeHeader