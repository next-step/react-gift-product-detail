import { QUERY_KEY } from "@/constants/queryKey";
import { getProductDetail } from "@/data/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ProductImage } from "../ProductHeader/ProductHeader.styles";
import { TabContentLayout } from "./ProductTabContents.styles";

function Info({ productId }: { productId: string }) {
  // TODO: api 에 이미지 리소스가 없음, 기존 이미지로 대체
  const { data } = useSuspenseQuery({
    queryKey: QUERY_KEY.PRODUCT_DETAIL(productId),
    queryFn: () => getProductDetail(productId),
  });

  return (
    <TabContentLayout>
      <ProductImage src={data.imageURL} />
    </TabContentLayout>
  );
}

export default Info;
