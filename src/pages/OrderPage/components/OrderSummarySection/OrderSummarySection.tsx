import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { FormValues } from "@/pages/OrderPage/OrderPage";
import { useProductSummary } from "@/hooks/useProductSummary";
import type { ApiError } from "@/types/error";
import {
  ProductInfoSection,
  SectionTitle,
  ProductCard,
  ProductImage,
  ProductInfo,
  ProductTitle,
  ProductBrand,
  ProductPrice,
  FixedOrderButton,
  SectionDivider,
} from "@/pages/OrderPage/OrderPage.style";

interface Props {
  productId: number;
  isSubmitting?: boolean;
}

const OrderSummarySection = ({ productId, isSubmitting = false }: Props) => {
  const navigate = useNavigate();
  const { watch } = useFormContext<FormValues>();

  const { data, isLoading, error } = useProductSummary(productId);
  const product = data?.data;

  if (error) {
    const apiError = error as ApiError;
    const status = apiError?.response?.status;

    if (status && status >= 400 && status < 500) {
      toast.error("상품 정보를 불러올 수 없습니다. 다시 시도해주세요.");
      navigate("/home");
    } else {
      toast.error("일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  }

  const getters = watch("getters") || [];
  const totalQuantity = getters.reduce(
    (sum, { quantity }) => sum + Number(quantity || 0),
    0
  );
  const totalPrice = product ? product.price * totalQuantity : 0;

  return (
    <>
      <SectionDivider />
      <ProductInfoSection>
        <SectionTitle>상품 정보</SectionTitle>
        {isLoading ? (
          <p style={{ textAlign: "center", padding: "24px" }}>
            상품 정보를 불러오는 중...
          </p>
        ) : product ? (
          <ProductCard>
            <ProductImage src={product.imageURL} />
            <ProductInfo>
              <ProductTitle>{product.name}</ProductTitle>
              <ProductBrand>{product.brandName}</ProductBrand>
              <ProductPrice>
                상품가 <b>{product.price}원</b>
              </ProductPrice>
            </ProductInfo>
          </ProductCard>
        ) : (
          <p style={{ textAlign: "center", padding: "24px" }}>
            상품 정보를 불러올 수 없습니다.
          </p>
        )}
      </ProductInfoSection>
      <FixedOrderButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? "주문 처리 중..." : `${totalPrice}원 주문하기`}
      </FixedOrderButton>
    </>
  );
};

export default OrderSummarySection;
