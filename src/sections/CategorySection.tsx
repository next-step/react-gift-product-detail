import styled from "@emotion/styled";
import CategoryCard from "@/components/CategoryCard";
import AsyncBoundary from "@/components/AsyncBoundary";
import { useThemesQuery } from "@/hooks/useThemesQuery";

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

export default function CategorySection() {
  const { data: themes, isLoading, isError } = useThemesQuery();

  return (
    <Section>
      <SectionTitle>선물 테마</SectionTitle>
      <AsyncBoundary loading={isLoading} error={isError} errorFallback={null}>
        {themes && themes.length > 0 && (
          <Grid>
            {themes.map(({ themeId, name, image }) => (
              <CategoryCard key={themeId} themeId={themeId} name={name} image={image} />
            ))}
          </Grid>
        )}
      </AsyncBoundary>
    </Section>
  );
}
