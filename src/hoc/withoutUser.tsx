import { useUserInfo } from "@/contexts/UserInfoContext";
import { ROUTE_PATH } from "@/routes/paths";
import { useEffect, type ComponentType } from "react";
import { useNavigate } from "react-router";

const withoutUser = <P extends object>(Component: ComponentType<P>) => {
  return (props: P) => {
    const navigate = useNavigate();
    const user = useUserInfo();

    useEffect(() => {
      if (user?.email) {
        const redirectPath = new URLSearchParams(location.search).get(
          "redirect",
        );
        navigate(redirectPath || ROUTE_PATH.HOME, { replace: true });
      }
    }, [user, navigate]);

    return <Component {...props} />;
  };
};

export default withoutUser;
