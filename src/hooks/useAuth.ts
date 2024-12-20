import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

export const useAuth = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      return result;
    } catch (error) {
      throw error;
    }
  };

  const signup = async (email: string, password: string, name?: string) => {
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }

      return res.json();
    } catch (error) {
      throw error;
    }
  };

  const logout = () => signOut({ callbackUrl: '/' });

  return {
    session,
    status,
    login,
    signup,
    logout,
    isAuthenticated: !!session,
    isLoading: status === 'loading',
  };
};