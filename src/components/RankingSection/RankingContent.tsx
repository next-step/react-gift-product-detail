import styled from '@emotion/styled';
import { loading } from '@/components/common/Loading';
import ProductGrid from './ProductGrid';
import ExpandButton from './ExpandButton';
import { ERROR_MESSAGES } from '@/constants/validation';
import type { Product } from '@/types/product';
import WithApiUi from '@/components/common/WithApiUi';

interface Props {
  data: Product[];
  isLoading: boolean;
  isError: boolean;
  visibleCount: number;
  toggleVisibleCount: () => void;
  isExpanded: boolean;
}

const RankingContent = ({
  data,
  isError,
  visibleCount,
  toggleVisibleCount,
  isExpanded,
}: Props) => {
  const visibleProducts = isExpanded ? data : data.slice(0, visibleCount);

  return (
    <WithApiUi
      data={data}
      error={isError}
      loading={loading}
      errorFallback={
        <EmptyText>{ERROR_MESSAGES.FAILED_TO_LOAD_PRODUCTS}</EmptyText>
      }
      emptyFallback={
        <EmptyText>{ERROR_MESSAGES.NO_PRODUCTS_AVAILABLE}</EmptyText>
      }
    >
      <>
        <ProductGrid products={visibleProducts} />
        <ExpandButton isExpanded={isExpanded} onToggle={toggleVisibleCount} />
      </>
    </WithApiUi>
  );
};

export default RankingContent;

const EmptyText = styled.p`
  ${({ theme }) => theme.typography.body.body2Regular};
  color: ${({ theme }) => theme.color.semantic.text};
  text-align: center;
  padding: ${({ theme }) => theme.spacing[6]} 0;
`;
