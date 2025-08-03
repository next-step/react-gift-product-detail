import * as S from './GiftRankingSection.styles';
import { useEffect, useState, useCallback } from 'react';
import FilterGroup from './FilterGroup';
import { useSearchParams } from 'react-router-dom';
import { useReactQueryFetch } from '@/hooks/useReactQueryFetch';
import ProductListRenderer from '@/components/ProductList/ProductListRenderer';
import { fetchProductRanking } from '@/api/products';
import type { TargetType, RankType, Product } from '@/api/products';

const GiftRankingSection = () => {
  const receivers = ['전체', '여성이', '남성이', '청소년이'];
  const sorts = ['받고 싶어한', '많이 선물한', '위시로 받은'];

  const receiverOptions: { text: string; apiValue: TargetType }[] = [
    { text: '전체', apiValue: 'ALL' },
    { text: '여성이', apiValue: 'FEMALE' },
    { text: '남성이', apiValue: 'MALE' },
    { text: '청소년이', apiValue: 'TEEN' },
  ];

  const sortOptions: { text: string; apiValue: RankType }[] = [
    { text: '받고 싶어한', apiValue: 'MANY_WISH' },
    { text: '많이 선물한', apiValue: 'MANY_RECEIVE' },
    { text: '위시로 받은', apiValue: 'MANY_WISH_RECEIVE' },
  ];

  const [searchParams, setSearchParams] = useSearchParams();

  const initialTargetType = (searchParams.get('targetType') as TargetType) || 'ALL';
  const initialRankType = (searchParams.get('rankType') as RankType) || 'MANY_WISH';

  const [selectedTargetType, setSelectedTargetType] = useState<TargetType>(initialTargetType);
  const [selectedRankType, setSelectedRankType] = useState<RankType>(initialRankType);

  const {
    data: response,
    isLoading,
    error,
  } = useReactQueryFetch<{ data: Product[] }>(
    ['productRanking', selectedTargetType, selectedRankType],
    () => fetchProductRanking(selectedTargetType, selectedRankType)
  );

  useEffect(() => {
    setSearchParams({
      targetType: selectedTargetType,
      rankType: selectedRankType,
    });
  }, [selectedTargetType, selectedRankType, setSearchParams]);

  const handleReceiverSelect = useCallback((text: string) => {
    const apiValue = receiverOptions.find((opt) => opt.text === text)?.apiValue || 'ALL';
    setSelectedTargetType(apiValue);
  }, []);

  const handleSortSelect = useCallback((text: string) => {
    const apiValue = sortOptions.find((opt) => opt.text === text)?.apiValue || 'MANY_WISH';
    setSelectedRankType(apiValue);
  }, []);

  const currentReceiverText =
    receiverOptions.find((opt) => opt.apiValue === selectedTargetType)?.text || '전체';
  const currentSortText =
    sortOptions.find((opt) => opt.apiValue === selectedRankType)?.text || '받고 싶어한';

  return (
    <S.Section>
      <FilterGroup
        items={receivers}
        selected={currentReceiverText}
        onSelect={handleReceiverSelect}
      />
      <FilterGroup items={sorts} selected={currentSortText} onSelect={handleSortSelect} />
      <ProductListRenderer
        isLoading={isLoading}
        error={error?.message ?? null}
        products={response?.data}
      />
    </S.Section>
  );
};

export default GiftRankingSection;
