import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import Spinner from '@/components/Spinner';
import { useThemeProductsQuery } from '@/queries/useThemesQuery';
import { type ThemeProduct } from '@/apis/theme';

interface ThemeProductSectionProps {
  themeId: string;
}

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.spacing6} ${({ theme }) => theme.spacing.spacing4};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.spacing4};
`;

const ProductCard = styled.div`
  border: 1px solid ${({ theme }) => theme.color.gray.gray200};
  border-radius: 8px;
  padding: ${({ theme }) => theme.spacing.spacing3};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 6px;
`;

const Brand = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.color.semantic.textSub};
`;

const Name = styled.span`
  font-weight: bold;
`;

const Price = styled.p`
  font-weight: bold;
`;

const Message = styled.p`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.spacing5};
  ${({ theme }) => theme.typography.body.body2Regular};
`;

const EmptyWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
`;

export default function ThemeProductSection({ themeId }: ThemeProductSectionProps) {
  const observerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useThemeProductsQuery(themeId);

  const handleClick = (id: number) => () => {
    navigate(`/order/${id}`);
  };

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    const currentRef = observerRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const products = data.pages.flatMap(page => page.list);

  if (products.length === 0) {
    return (
      <Section>
        <EmptyWrapper>
          <Message>상품이 없습니다.</Message>
        </EmptyWrapper>
      </Section>
    );
  }
  return (
    <Section>
      <Grid>
        {products.map((product: ThemeProduct) => (
          <ProductCard key={product.id} onClick={handleClick(product.id)}>
            <ProductImage src={product.imageURL} alt={product.name} />
            <Brand>{product.brandInfo.name}</Brand>
            <Name>{product.name}</Name>
            <Price>{product.price.sellingPrice.toLocaleString()}원</Price>
          </ProductCard>
        ))}
      </Grid>
      {hasNextPage && (
        <div ref={observerRef} style={{ height: '20px' }}>
          {isFetchingNextPage && <Spinner />}
        </div>
      )}
    </Section>
  );
}
