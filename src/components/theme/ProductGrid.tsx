import styled from "@emotion/styled";
import ProductCard from "./ProductCard";
import type { ProductInfo } from "@/types/product";

interface Props {
  products: ProductInfo[];
  loaderRef: React.RefObject<HTMLDivElement | null>;
  isLoading: boolean;
}

export default function ProductGrid({ products, loaderRef, isLoading }: Props) {
  return (
    <CardGrid isEmpty={products.length === 0}>
      {products.length === 0 && isLoading ? (
        <Spinner />
      ) : products.length === 0 ? (
        <EmptyBox>
          <EmptyMessage>상품이 없습니다.</EmptyMessage>
        </EmptyBox>
      ) : (
        products.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))
      )}
      <div ref={loaderRef} style={{ height: 40 }} />
    </CardGrid>
  );
}

const CardGrid = styled.div<{ isEmpty: boolean }>`
  width: 100%;
  ${({ isEmpty }) =>
    isEmpty
      ? `
    display: flex;
    justify-content: center;
    align-items: center;
    height: 240px;
  `
      : `
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px 8px;
    align-items: stretch;
  `}
`;

const Spinner = styled.div`
  margin: 40px auto;
  width: 25px;
  height: 25px;
  border: 4px solid #ccc;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const EmptyBox = styled.div`
  width: 100%;
  height: 240px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
`;

const EmptyMessage = styled.p`
  ${({ theme }) => theme.typography.body2Regular};
  color: ${({ theme }) => theme.colors.gray[900]};
  margin: 0px;
  width: 100%;
  text-align: center;
`;
