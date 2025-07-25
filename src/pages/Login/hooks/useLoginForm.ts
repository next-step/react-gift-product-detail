import { useNavigate, useSearchParams } from 'react-router-dom';
import { UserManagement } from '../contexts/UserManagement';
import { useEmailInput } from './useEmailInput';
import { usePasswordInput } from './usePasswordInput';
import { useLoginMutation } from '../../../apis/auth';

export const useLoginForm = () => {
  const email = useEmailInput();
  const password = usePasswordInput();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = UserManagement();

  const isValid = email.isValid && password.isValid;
  const redirectPath = searchParams.get('redirect') || '/my';

  const mutation = useLoginMutation((resJson) => {
    const { email: userEmail, name, authToken } = resJson.data;
    login({ authToken, email: userEmail, name });
    navigate(redirectPath, { replace: true });
  });

  const goToLogin = () => {
    if (!isValid || mutation.isPending) return;

    mutation.mutate({
      email: email.value,
      password: password.value,
    });
  };

  return {
    email,
    password,
    isValid,
    loading: mutation.isPending,
    goToLogin,
  };
};
