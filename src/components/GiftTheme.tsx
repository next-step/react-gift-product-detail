import styled from '@emotion/styled';
import { Suspense } from 'react';
import Spinner from './common/Spinner';
import { ErrorBoundary } from '@/ErrorBoundary';
import CategoryItem from './CategoryItem';
import useGiftTheme from '@/hooks/useGiftTheme';

const Wrapper = styled.section`
  margin-top: ${({ theme }) => theme.spacing.spacing6};
  margin-bottom: ${({ theme }) => theme.spacing.spacing6};
  padding: ${({ theme }) => theme.spacing.spacing2};
`;

const Title = styled.h2`
  ${({ theme }) => theme.typography.title1Bold};
  padding: 0 8px 20px;
`;

const Grid = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: ${({ theme }) => theme.spacing.spacing5} ${({ theme }) => theme.spacing.spacing1};
  cursor: pointer;
`;

const GridFallback = styled.div`
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function GiftThemeContent() {
  const { data: themes } = useGiftTheme();

  if (themes.length === 0) return null;

  return (
    <Grid>
      {themes.map(({ themeId, name, image }) => (
        <CategoryItem key={themeId} themeId={themeId} name={name} image={image} />
      ))}
    </Grid>
  );
}

export default function GiftTheme() {
  return (
    <Wrapper>
      <Title>선물 테마</Title>
      <ErrorBoundary fallback={<div>에러가 발생했어요</div>}>
        <Suspense fallback={<GridFallback>{<Spinner />}</GridFallback>}>
          <GiftThemeContent />
        </Suspense>
      </ErrorBoundary>
    </Wrapper>
  );
}
