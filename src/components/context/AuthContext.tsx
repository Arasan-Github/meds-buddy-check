/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import {supabase} from '../../supabase-client';
import type { Session } from '@supabase/supabase-js';
// Define the context type
type AuthContextType = {
  session: Session | null;
  setSession: (value: Session | null) => void;
  signInUser: (email: string, password: string) => Promise<{
    success: boolean;
    error?: string;
    data?: any;
  }>;
   signOut: () => Promise<{
    success: boolean;
    error?: string;
    data?: any;
  }>;
};

// Create the context with type
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component with typed props
export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
const [session, setSession] = useState<Session | null>(null);


  useEffect(()=>{
async function getInitialSession() {
   try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        throw error;
      }

      console.log(data.session);
      setSession(data.session);
    } catch (error) {
      console.error('Error getting session:', error.message);
    }

  }
  getInitialSession()
  supabase.auth.onAuthStateChange((_event, session) => {
    setSession(session);
    console.log('Session changed:', session);
  })
  },[])

  const signInUser = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password: password,
      })
      if (error) {
        console.error('Supabase sign-in error:', error.message);
        return { success: false, error: error.message };
      }
      console.log('Supabase sign-in success:', data);
      return { success: true, data };
    } catch (error) {
      //Unexpected error
      console.error('Unexpected error during sign-in:', error.message);
      return { success: false, error: 'An unexpected error occurred. Please try again.' };
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Supabase sign-out error:', error.message);
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (error) {
      console.error('Unexpected error during sign-out:', error.message);
      return { success: false, error: 'An unexpected error occurred during sign out.' };
    }
  }

  return (
    <AuthContext.Provider value={{ session, setSession, signInUser, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for consuming context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};
