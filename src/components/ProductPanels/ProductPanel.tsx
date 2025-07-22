import { useParams } from "react-router-dom";
import { PATH } from "@src/router/Router";
import FooterPanel from "./FooterPanel";
import { useLoginRedirection } from "@src/hooks/useLoginRedirection";

export type ProductData = {
  imageURL: string;
  id: number;
  name: string;
  brandName: string;
  price: number;
};

function ProductPanel() {
  const productId = useParams().id ?? "";

  useLoginRedirection(`${PATH.PRODUCT}/${productId}`);

  return (
    <>
      Product Panel <br />
      <FooterPanel />
    </>
  );
}

export default ProductPanel;
