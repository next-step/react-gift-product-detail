import { useUserInfo } from "@/contexts/UserInfoContext";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

type UseHandleLoginSuccessParams = {
  email: string | undefined;
  name: string | undefined;
  authToken: string | undefined;
  isPending: boolean;
  isError: boolean;
};

const useHandleLoginSuccess = ({
  email,
  name,
  authToken,
  isPending,
  isError,
}: UseHandleLoginSuccessParams) => {
  const user = useUserInfo();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (email && name && authToken && !isPending && !isError && !user?.email) {
      user?.setUserInfo({
        email,
        name,
        authToken,
      });
    }
  }, [
    email,
    name,
    authToken,
    isPending,
    isError,
    user,
    location.search,
    navigate,
  ]);
};

export default useHandleLoginSuccess;
