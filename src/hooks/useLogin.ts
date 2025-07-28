import { postLogin } from "@/api/login";
import type { PostLoginParams, PostLoginResult } from "@/api/login";
import { useMutation } from "@tanstack/react-query";

type UseLoginParams = {
  onSuccessCallback?: () => void;
  onErrorCallback?: () => void;
};

const useLogin = ({ onSuccessCallback, onErrorCallback }: UseLoginParams) => {
  const {
    data,
    isPending,
    isError,
    mutate: login,
  } = useMutation<PostLoginResult, Error, PostLoginParams>({
    mutationFn: postLogin,
    onSuccess: () => {
      onSuccessCallback?.();
    },
    onError: () => {
      onErrorCallback?.();
    },
  });

  return { data, isPending, isError, login };
};

export default useLogin;
