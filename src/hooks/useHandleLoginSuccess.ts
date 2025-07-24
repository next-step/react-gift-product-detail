import { useUserInfo } from "@/contexts/UserInfoContext";
import { ROUTE_PATH } from "@/routes/paths";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

type UseHandleLoginSuccessParams = {
  email: string | undefined;
  name: string | undefined;
  authToken: string | undefined;
  isLoading: boolean;
  isError: boolean;
};

const useHandleLoginSuccess = ({
  email,
  name,
  authToken,
  isLoading,
  isError,
}: UseHandleLoginSuccessParams) => {
  const user = useUserInfo();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (email && name && authToken && !isLoading && !isError && !user?.email) {
      user?.setUserInfo({
        email,
        name,
        authToken,
      });

      const redirectPath = new URLSearchParams(location.search).get("redirect");
      navigate(redirectPath || ROUTE_PATH.HOME);
    }
  }, [
    email,
    name,
    authToken,
    isLoading,
    isError,
    user,
    location.search,
    navigate,
  ]);
};

export default useHandleLoginSuccess;
