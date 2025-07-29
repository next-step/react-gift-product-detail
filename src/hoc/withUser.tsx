import { useUserInfo } from "@/contexts/UserInfoContext";
import { ROUTE_PATH } from "@/routes/paths";
import { useEffect, type ComponentType } from "react";
import { useLocation, useNavigate } from "react-router";

const withUser = <P extends object>(Component: ComponentType<P>) => {
  return (props: P) => {
    const navigate = useNavigate();
    const user = useUserInfo();
    const location = useLocation();

    useEffect(() => {
      if (!user?.email) {
        navigate(`${ROUTE_PATH.LOGIN}?redirect=${location.pathname}`, {
          replace: true,
        });
      }
    }, [user, navigate, location.pathname]);

    return <Component {...props} />;
  };
};

export default withUser;
