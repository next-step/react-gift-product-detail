import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface RedirectOnErrorProps {
  to: string;
}

const RedirectOnError = ({ to }: RedirectOnErrorProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(to, { replace: true });
  }, [navigate, to]);

  return null;
};

export default RedirectOnError; 