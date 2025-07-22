import { useNavigate, useParams } from "react-router-dom";
import { fetchProductSummary } from "@src/apis/BackEnd/apiList";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import UserContext from "@src/contexts/UserContext";
import { PATH } from "@src/router/Router";

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
  const productData = useSuspenseQuery<ProductData>({
    queryKey: ["product", productId],
    queryFn: () => fetchProductSummary(productId)
  });

  const redirectLogin = (path: string, id: string | undefined) => {
    navigate(PATH.LOGIN + `?redirect=${encodeURIComponent(path)}/${id}`);
  };

  useEffect(() => {
    if (!userContext?.authToken.value) {
      redirectLogin(PATH.PRODUCT, productId);
    }
  }, [userContext?.authToken.value, productId]);

  return <>Product Panel</>;
}

export default ProductPanel;
