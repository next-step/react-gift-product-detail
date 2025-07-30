import { Suspense, useState } from 'react';
import {
  MoreButton,
  Grid,
  Section,
  Title,
  CategoryFilter,
  SortOptions,
  Error,
} from '@/components/GiftRanking/GiftRanking.styles';
import {
  categories,
  INITIAL_VISIBLE_GIFT_COUNT,
  rankTypeMap,
  sorts,
  targetTypeMap,
  TOTAL_GIFT_COUNT,
} from '@/constants/RankingConstants';
import CardList from '@/components/Common/CardItem/CardList.tsx';
import useLocalStorageState from '@/hooks/useLocalStorageState.ts';
import { useNavigate } from 'react-router-dom';
import useFetchRanking from '@/hooks/fetch/useFetchRanking.ts';
import FilterButton from '@/components/Common/FilterButton/FilterButton.tsx';
import SortSpan from '@/components/Common/SortOption/SortOption.tsx';
import { getUserInfo } from '@/storage/userInfo.ts';
import { PATH } from '@/constants/path.ts';
import Loading from '@/components/Common/Loading/Loading.tsx';
import { ErrorBoundary } from '@/components/Common/ErrorBoundary.tsx';

export default function GiftRanking() {
  const navigate = useNavigate();
  const [showCount, setShowCount] = useState<number>(INITIAL_VISIBLE_GIFT_COUNT);
  const [category, setCategory] = useLocalStorageState<string>('giftRankingCategory', '전체');
  const [sort, setSort] = useLocalStorageState<string>('giftRankingSort', '받고 싶어한');
  const userInfo = getUserInfo();
  const targetType = targetTypeMap[category];
  const rankType = rankTypeMap[sort];

  const { ranking } = useFetchRanking(targetType, rankType);

  const handleToggle = () => {
    setShowCount((prev) =>
      prev === INITIAL_VISIBLE_GIFT_COUNT ? TOTAL_GIFT_COUNT : INITIAL_VISIBLE_GIFT_COUNT,
    );
  };

  if (!Array.isArray(ranking) || ranking.length === 0) {
    return (
      <Section>
        <Title>실시간 급상승 선물랭킹</Title>
        <CategoryFilter>
          {categories.map(({ label, icon }) => (
            <FilterButton
              key={label}
              label={label}
              icon={icon}
              isActive={category === label}
              onClick={() => setCategory(label)}
            />
          ))}
        </CategoryFilter>

        <SortOptions>
          {sorts.map((option) => (
            <SortSpan
              key={option}
              label={option}
              isActive={sort === option}
              onClick={() => setSort(option)}
            />
          ))}
        </SortOptions>
        <Error>상품이 없습니다.</Error>
      </Section>
    );
  }

  return (
    <Section>
      <Title>실시간 급상승 선물랭킹</Title>

      <CategoryFilter>
        {categories.map(({ label, icon }) => (
          <FilterButton
            key={label}
            label={label}
            icon={icon}
            isActive={category === label}
            onClick={() => setCategory(label)}
          />
        ))}
      </CategoryFilter>

      <SortOptions>
        {sorts.map((option) => (
          <SortSpan
            key={option}
            label={option}
            isActive={sort === option}
            onClick={() => setSort(option)}
          />
        ))}
      </SortOptions>

      <ErrorBoundary fallback={<div>에러 발생</div>}>
        <Suspense fallback={<Loading />}>
          <Grid>
            {ranking.slice(0, showCount).map((item, index) => (
              <CardList
                key={item.name + index}
                rank={index + 1}
                image={item.imageURL}
                name={item.name}
                price={item.price.sellingPrice}
                brand={item.brandInfo.name}
                onClick={() =>
                  navigate(userInfo ? `${PATH.PRODUCT}/${item.id}` : `${PATH.LOGIN}`, {
                    state: { ranking, from: `${PATH.PRODUCT}/${item.id}` },
                  })
                }
              />
            ))}
          </Grid>
        </Suspense>
      </ErrorBoundary>

      <MoreButton onClick={handleToggle}>
        {showCount === INITIAL_VISIBLE_GIFT_COUNT ? '더보기' : '접기'}
      </MoreButton>
    </Section>
  );
}
