import { requests } from '@/api/requests';
import type { ThemeInfo } from '@/types';
import { useEffect, useState } from 'react';

const useThemes = () => {
  const [themes, setThemes] = useState<ThemeInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await requests.fetchTheme();
        setThemes(data);
      } catch (error) {
        setError(true);
        console.error('Error fetching themes:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { themes, loading, error };
};

export default useThemes;
