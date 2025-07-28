import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchProductRanking } from '@/api/ranking';
import type { Product } from '@/api/ranking';

interface UseGiftRankingProps {
  target: string;
  rank: string;
}

const useGiftRanking = ({ target, rank }: UseGiftRankingProps) => {
  const {
    data: products,
  } = useSuspenseQuery<Product[], Error>({
    queryKey: ['productRanking', target, rank],
    queryFn: () => fetchProductRanking(target, rank),
  });

  return {
    products: products || [],
  };
};

export default useGiftRanking;
