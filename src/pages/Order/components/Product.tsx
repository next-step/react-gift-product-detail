import Divider from "@/components/common/Divider";
import Loading from "@/components/common/Loading";
import { ROUTE_PATH } from "@/components/routes/routePath";
import API_ENDPOINTS from "@/constants/apiEndpoints";
import useFetch from "@/hooks/useFetch";
import type { OrderFormType } from "@/pages/Order/components/Order";
import { isApiErrorResponse, type ApiErrorData } from "@/types/ApiErrorResponse";
import type { ProductSummary } from "@/types/ProductType";
import { showFetchErrorToast } from "@/utils/showFetchToast";
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { generatePath, useNavigate, useParams } from "react-router-dom";

const Product = () => {
  const { setValue } = useFormContext<OrderFormType>();
  const { productId } = useParams();
  const navigate = useNavigate();
  const { fetchData } = useFetch<ProductSummary>(
    generatePath(API_ENDPOINTS.PRODUCT_SUMMARY, { productId: productId ?? null }),
  );
  const { data, isPending, isError, error } = useQuery<ProductSummary, ApiErrorData>({
    queryKey: ["orderProduct", productId],
    queryFn: () => fetchData(),
    enabled: !!productId,
  });
  const product = useMemo(() => data, [data]);
  const goHome = useCallback(() => navigate(ROUTE_PATH.HOME), [navigate]);

  useEffect(() => {
    if (product) {
      setValue("productId", product.id);
    } else if (isApiErrorResponse(error)) {
      showFetchErrorToast(error.statusCode, error.message, goHome);
    }
  }, [error, setValue, goHome, product]);

  if (isPending) {
    return <Loading height="170px" />;
  }

  if (isError) {
    return null;
  }

  return (
    <Content>
      <Divider spacing="1rem" />
      <Title>상품 정보</Title>
      <Divider spacing="1rem" />
      <ProductWrapper>
        <ProductImg alt="product" src={product?.imageURL} />
        <div>
          <ProductTitle>{product?.name}</ProductTitle>
          <ProductBrand>{product?.brandName}</ProductBrand>
          <ProductPrice>
            <ProductPriceInfo>상품가 </ProductPriceInfo>
            {product?.price}원
          </ProductPrice>
        </div>
      </ProductWrapper>
      <Divider spacing="1.5rem" />
    </Content>
  );
};

export default Product;

const Content = styled.div`
  width: 100%;
  padding: 0 ${({ theme }) => theme.spacing.spacing4};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Title = styled.p`
  width: 100%;
  font: ${({ theme }) => theme.typography.title2Bold};
  text-align: left;
`;
const ProductWrapper = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.spacing3};
  display: flex;
  border: 1px solid ${({ theme }) => theme.color.gray600};
  border-radius: 0.5rem;
  gap: ${({ theme }) => theme.spacing.spacing3};
`;
const ProductImg = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 0.5rem;
  object-fit: cover;
`;
const ProductTitle = styled.p`
  font: ${({ theme }) => theme.typography.body2Regular};
  text-align: left;
`;
const ProductBrand = styled.p`
  font: ${({ theme }) => theme.typography.label2Regular};
  color: ${({ theme }) => theme.color.gray600};
  text-align: left;
`;
const ProductPriceInfo = styled.span`
  font: ${({ theme }) => theme.typography.label1Regular};
  color: ${({ theme }) => theme.color.gray600};
`;
const ProductPrice = styled.p`
  font: ${({ theme }) => theme.typography.label2Bold};
  text-align: left;
`;
