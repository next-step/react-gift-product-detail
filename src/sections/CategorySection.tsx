import styled from '@emotion/styled';
import CategoryCard from '@/components/CategoryCard';
import { useThemesQuery } from '@/queries/useThemesQuery';
import { Suspense } from 'react';
import Spinner from '@/components/Spinner';
import CustomErrorBoundary from '@/components/CustomErrorBoundary';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.spacing5} 0;
`;

const SectionTitle = styled.h2`
  ${({ theme }) => theme.typography.title.title1Bold};
  margin-left: ${({ theme }) => theme.spacing.spacing4};
  margin-bottom: ${({ theme }) => theme.spacing.spacing3};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: ${({ theme }) => theme.spacing.spacing3};
`;

function CategoryList() {
  const { data: themes } = useThemesQuery();

  if (themes.length === 0) return null;

  return (
    <Grid>
      {themes.map(({ themeId, name, image }) => (
        <CategoryCard key={themeId} themeId={themeId} name={name} image={image} />
      ))}
    </Grid>
  );
}

export default function CategorySection() {
  return (
    <Section>
      <SectionTitle>선물 테마</SectionTitle>
      <CustomErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <CategoryList />
        </Suspense>
      </CustomErrorBoundary>
    </Section>
  );
}
