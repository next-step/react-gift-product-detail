import { useParams } from "react-router-dom";
import { PATH } from "@src/router/Router";
import FooterPanel from "./FooterPanel";
import { useLoginRedirection } from "@src/hooks/useLoginRedirection";
import ProductCard from "./ProductCard";
import ProductDetail from "./ProductDetail";

function ProductPanel() {
  const productId = useParams().id ?? "";

  useLoginRedirection(`${PATH.PRODUCT}/${productId}`);

  return (
    <>
      <ProductCard />
      <ProductDetail />
      <FooterPanel />
    </>
  );
}

export default ProductPanel;
