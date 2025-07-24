import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "react-router-dom";
import { setUserInfo } from "@/utils/storage";
import { useRouter } from "@/hooks/common/useRouter";
import { loginSchema, showToast, type LoginFormData } from "@/utils";
import { signin } from "@/api/login/signin";
import { useMutation } from "@tanstack/react-query";

export const useLoginForm = () => {
  const { navigate, location } = useRouter();
  const [searchParams] = useSearchParams();

  const {
    mutate: login,
    isPending: isLoading,
    error: loginError,
  } = useMutation({
    mutationFn: signin,
    onSuccess: response => {
      setUserInfo({
        email: response.email,
        name: response.name,
        authToken: response.authToken,
      });
      const previousPage = location.state?.from;
      const redirectPath = previousPage || searchParams.get("redirect") || "/";
      navigate(redirectPath);
    },
    onError: error => {
      showToast.error(error.message);
      console.error("로그인 처리 중 오류 발생:", error);
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      id: "",
      password: "",
    },
  });

  const watchedValues = watch();

  const isFormValid = (() => {
    try {
      loginSchema.parse(watchedValues);
      return true;
    } catch {
      return false;
    }
  })();

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
    isFormValid: isFormValid,
    isLoading,
    loginError,
  };
};
