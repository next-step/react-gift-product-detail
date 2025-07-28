import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { PATH } from "@/constants/path";

export const useRequireNavigate = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  return (path: string) => {
    if (!isLoggedIn) {
      navigate(PATH.LOGIN, {
        replace: true,
        state: { from: { pathname: path } },
      });
    } else {
      navigate(path);
    }
  };
};
