import { postLogin } from "@/api/login";
import type { PostLoginParams, PostLoginResult } from "@/api/login";
import { useMutation } from "@tanstack/react-query";

type UseLoginParams = {
  onSuccess?: () => void;
  onError?: () => void;
};

const useLogin = ({ onSuccess, onError }: UseLoginParams) => {
  const {
    data,
    isPending,
    isError,
    mutate: login,
  } = useMutation<PostLoginResult, Error, PostLoginParams>({
    mutationFn: postLogin,
    onSuccess: () => {
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    },
  });

  return { data, isPending, isError, login };
};

export default useLogin;
