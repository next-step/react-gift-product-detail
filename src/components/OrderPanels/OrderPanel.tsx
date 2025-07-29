import { useParams } from "react-router-dom";
import { fetchProductSummary } from "@src/apis/BackEnd/apiList";
import OrderForm from "@src/components/OrderPanels/OrderForm";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { ProductData } from "@src/types/ProductDataType";

function OrderPanel() {
  const productId = useParams().id ?? "";
  const productData = useSuspenseQuery<ProductData>({
    queryKey: ["product", productId],
    queryFn: () => fetchProductSummary(productId)
  });

  return <OrderForm productData={productData.data!} />;
}

export default OrderPanel;
