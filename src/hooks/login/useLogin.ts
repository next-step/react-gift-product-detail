import { useLoginForm } from "@/hooks/login";
import { useLoginMutation } from "@/hooks/login";
import type { LoginFormData } from "@/utils";

export const useLogin = () => {
  const {
    mutate: login,
    isPending: isLoading,
    error: loginError,
  } = useLoginMutation();

  const {
    handleSubmit,
    register,
    formState: { errors },
    isFormValid,
  } = useLoginForm();

  const onSubmit = async (values: LoginFormData) => {
    login({
      email: values.id,
      password: values.password,
    });
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isFormValid,
    isLoading,
    loginError,
  };
};
