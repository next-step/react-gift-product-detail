import { signin } from "@/api/login/signin";
import { useRouter } from "@/hooks/common/useRouter";
import { setUserInfo, showToast } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export const useLoginMutation = () => {
  const { navigate, location } = useRouter();
  const [searchParams] = useSearchParams();

  return useMutation({
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
};
