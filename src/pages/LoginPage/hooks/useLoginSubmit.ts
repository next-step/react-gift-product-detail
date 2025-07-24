import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/contexts/AuthContext";
import { getUserInfo } from "@/data/api";
import { AxiosError } from "axios";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API_LOGIN_ERROR_MESSAGES } from "../constants/apiMessage";
import { isClientError } from "@/constants/httpStatus";
import { useMutation } from "@tanstack/react-query";
import type { User } from "@/types/User";

interface UseLoginSubmitProps {
  email: string;
  password: string;
}

function useLoginSubmit({ email, password }: UseLoginSubmitProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const { login } = useAuth();

  const loginMutation = useMutation<User, AxiosError, UseLoginSubmitProps>({
    mutationFn: ({ email, password }) => getUserInfo(email, password),
    onSuccess: (data) => {
      login(data.email, data.name, data.authToken);

      const redirectPath = searchParams.get("redirect");
      const from = redirectPath || location.state?.from || ROUTES.HOME;

      navigate(from, { replace: true });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const errorStatus = error.response?.status;

        if (errorStatus && isClientError(errorStatus)) {
          toast.error(API_LOGIN_ERROR_MESSAGES.EMAIL_FORMAT_INVALID);
        }
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    loginMutation.mutate({ email, password });
  };

  return { handleSubmit };
}

export default useLoginSubmit;
