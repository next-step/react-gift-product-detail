import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "@src/contexts/UserContext";
import { PATH } from "@src/router/Router";

export function useLoginRedirection(path: string) {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (!userContext?.authToken.value) {
      navigate(`${PATH.LOGIN}?redirect=${encodeURIComponent(path)}`);
    }
  }, [userContext?.authToken.value, path, navigate]);
}
