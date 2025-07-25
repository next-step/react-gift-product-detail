import { ErrorMessage } from "@/components/common/Input/FormErrorMessage";
import { Loading } from "@/components/Loading/Loading";
import { QUERY_KEY } from "@/constants/queryKey";
import { getProductDetail } from "@/data/api";
import Layout from "@/layout";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useParams } from "react-router-dom";
import { ErrorContainer } from "../HomePage/components/Category/Category.styles";

function ProductDetailPage() {
  const { id } = useParams();

  const { data } = useSuspenseQuery({
    queryKey: QUERY_KEY.PRODUCT_DETAIL(id),
    queryFn: () => getProductDetail(id!),
  });

  return (
    <Layout>
      <ErrorBoundary
        fallback={
          <ErrorContainer>
            <ErrorMessage>등록된 상품이 없습니다.</ErrorMessage>
          </ErrorContainer>
        }
      >
        <Suspense fallback={<Loading />}>
          <div>ProductDetailPage: {id}</div>
        </Suspense>
      </ErrorBoundary>
    </Layout>
  );
}

export default ProductDetailPage;
