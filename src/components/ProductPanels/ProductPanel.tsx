import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import UserContext from "@src/contexts/UserContext";
import { PATH } from "@src/router/Router";
import FooterPanel from "./FooterPanel";

export type ProductData = {
  imageURL: string;
  id: number;
  name: string;
  brandName: string;
  price: number;
};

function ProductPanel() {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const productId = useParams().id ?? "";

  const redirectLogin = (path: string, id: string | undefined) => {
    navigate(PATH.LOGIN + `?redirect=${encodeURIComponent(path)}/${id}`);
  };

  useEffect(() => {
    if (!userContext?.authToken.value) {
      redirectLogin(PATH.PRODUCT, productId);
    }
  }, [userContext?.authToken.value, productId]);

  return (
    <>
      Product Panel <br />
      <FooterPanel />
    </>
  );
}

export default ProductPanel;
