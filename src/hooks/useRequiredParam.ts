import { useParams } from 'react-router-dom';

export const useRequiredParam = (key: string): string => {
  const papams = useParams();
  const value = papams[key];
  if (!value) throw new Error(`Missing params: ${key}`);
  return value;
};

export default useRequiredParam;
