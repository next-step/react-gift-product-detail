import { useState, useEffect } from 'react';
import { createStorage } from '@/utils/creaateStorage';

interface User {
  name: string;
  email: string;
  token: string;
}

const storage = createStorage<{ name: string; email: string; token: string }>(
  'userInfo'
);

export const useAuthUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = storage.get();
      if (stored && stored.name && stored.email && stored.token) {
        setUser({ name: stored.name, email: stored.email, token: stored.token });
        setIsLoggedIn(true);
        setToken(stored.token);
      } else {
        setUser(null);
        setIsLoggedIn(false);
        setToken(null);
      }
    } catch (error) {
      console.error(error);
      storage.clear();
      setUser(null);
      setIsLoggedIn(false);
      setToken(null);
    }
  }, []);

  return { user, isLoggedIn, token, setUser, setIsLoggedIn, setToken, storage };
};
