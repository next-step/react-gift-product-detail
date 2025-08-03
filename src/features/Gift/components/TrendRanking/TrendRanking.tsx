import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Loading from '@/components/Loading/Loading';
import * as S from '@/features/Gift/components/TrendRanking/TrendRanking.style';
import {
  FilterGender,
  FilterType,
} from '@/features/Gift/components/TrendRanking/TrendRankingFilter';
import { ROUTE_PATH } from '@/routes/Router';
import type {
  Product,
  Gender,
  Type,
} from '@/features/Gift/hooks/useProductsRanking';
import { ErrorBoundary } from '@/components/Error/ErrorBoundary';
import { Suspense } from 'react';
import RankingSection from './RankingSection';

const genderList = [
  { label: 'All', icon: 'ALL' },
  { label: '남성이', icon: '👨‍🦰' },
  { label: '여성이', icon: '👩‍🦰' },
  { label: '청소년이', icon: '👦' },
] as const;

const typeList = ['받고 싶어한', '많이 선물한', '위시로 받은'] as const;

const isValidGender = (value: string): value is Gender =>
  genderList.some((g) => g.label === value);

const isValidType = (value: string): value is Type =>
  typeList.includes(value as Type);

const TrendRanking = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const selectedGender = (searchParams.get('gender') ??
    genderList[0].label) as Gender;
  const selectedType = (searchParams.get('type') ?? typeList[0]) as Type;

  const handleProductSelect = (product: Product) => {
    navigate(ROUTE_PATH.ORDER.replace(':productId', String(product.id)));
  };

  const handleGenderClick = (label: string) => {
    if (!isValidGender(label)) return;
    const params = new URLSearchParams(searchParams);
    params.set('gender', label);
    if (selectedType) params.set('type', selectedType);
    setSearchParams(params, { replace: true });
  };

  const handleTypeClick = (label: string) => {
    if (!isValidType(label)) return;
    const params = new URLSearchParams(searchParams);
    params.set('type', label);
    if (selectedGender) params.set('gender', selectedGender);
    setSearchParams(params, { replace: true });
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const prevGender = params.get('gender');
    const prevType = params.get('type');

    const isGenderValid = genderList.some((g) => g.label === selectedGender);
    const isTypeValid = typeList.includes(selectedType);

    if (!isGenderValid) params.set('gender', genderList[0].label);
    if (!isTypeValid) params.set('type', typeList[0]);

    const isChanged =
      prevGender !== params.get('gender') || prevType !== params.get('type');
    if (isChanged) {
      setSearchParams(params, { replace: true });
    }
  }, [searchParams, selectedGender, selectedType, setSearchParams]);

  return (
    <S.Container>
      <S.Title>실시간 급상승 선물랭킹</S.Title>

      <S.GenderTab>
        {genderList.map(({ icon, label }) => (
          <FilterGender
            key={label}
            icon={icon}
            label={label}
            isActive={selectedGender === label}
            onClick={handleGenderClick}
          />
        ))}
      </S.GenderTab>

      <S.TypeTab>
        {typeList.map((label) => (
          <FilterType
            key={label}
            label={label}
            isActive={selectedType === label}
            onClick={handleTypeClick}
          />
        ))}
      </S.TypeTab>

      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <RankingSection
            selectedGender={selectedGender}
            selectedType={selectedType}
            onProductSelect={handleProductSelect}
          />
        </Suspense>
      </ErrorBoundary>
    </S.Container>
  );
};

export default TrendRanking;
