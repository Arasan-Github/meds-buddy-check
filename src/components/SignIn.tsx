import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const { signInUser } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    try {
      const { success, data, error: signInError } = await signInUser(email, password);

      if (signInError) {
        setError(new Error(signInError));
        return;
      }

      if (success && data?.session) {
        navigate('/dashboard')
        console.log('Sign-in success, redirecting...');
      }
    } catch (err: unknown){
  if (err instanceof Error) {
    console.error('Sign in error:', err.message);
    setError(new Error('An unexpected error occurred. Please try again.'));
  } else {
    setError(new Error('Unknown error occurred.'));
  }
}

  };

  return (
    <div className="sign-form-container">
      <form onSubmit={handleSubmit} aria-label="Sign in form" aria-describedby="form-description">
        <div id="form-description" className="sr-only">
          Use this form to sign in to your account. Enter your email and password.
        </div>

        <h2 className="form-title">Sign in</h2>

        <label htmlFor="email">Email</label>
        <input
          className="form-input"
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-required="true"
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? 'signin-error' : undefined}
          disabled={isPending}
        />

        <label htmlFor="password">Password</label>
        <input
          className="form-input"
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          aria-required="true"
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? 'signin-error' : undefined}
          disabled={isPending}
        />

        <button type="submit" className="form-button" aria-busy={isPending}>
          {isPending ? 'Signing in...' : 'Sign In'}
        </button>

        {error && (
          <div
            id="signin-error"
            role="alert"
            className="sign-form-error-message"
          >
            {error.message}
          </div>
        )}
      </form>
    </div>
  );
};

export default Signin;
