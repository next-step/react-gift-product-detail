import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/entities/user/model/context';
import { useInput } from '@/shared/lib/hooks';
import { validateEmail, validatePassword } from './login';
import { type FormSubmitHandler } from '@/shared/types';

export const useLoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const email = useInput({
    validator: validateEmail,
  });

  const password = useInput({
    validator: validatePassword,
  });

  const isFormValid = !validateEmail(email.value) && !validatePassword(password.value);

  const handleSubmit: FormSubmitHandler = (e) => {
    e.preventDefault();

    if (!isFormValid) {
      return;
    }

    login(email.value, password.value, () => {
      const from = location.state?.from || '/';
      navigate(from, { replace: true });
    });
  };

  return {
    email,
    password,
    isFormValid,
    handleSubmit,
  };
};