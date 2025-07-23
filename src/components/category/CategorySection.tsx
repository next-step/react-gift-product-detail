/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

import { CategoryCard } from "@/components/category/CategoryCard";
import { useThemes } from "@/hooks/queries/useThemes";

export const CategorySection = () => {
  const { data: themes } = useThemes();

  if (!themes || themes.length === 0) {
    return <ErrorBanner>카테고리를 불러올 수 없습니다.</ErrorBanner>;
  }

  return (
    <CategoryGrid>
      {themes.map(({ themeId, name, image }) => (
        <CategoryCard
          key={themeId}
          themeId={themeId}
          name={name}
          image={image}
        />
      ))}
    </CategoryGrid>
  );
};

const CategoryGrid = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px 4px;
  padding: 20px 0;
`;

const ErrorBanner = styled.div`
  background-color: #fff1f1;
  color: #d32f2f;
  padding: 12px 16px;
  margin-top: 16px;
  border-radius: 8px;
  text-align: center;
  ${({ theme }) => theme.typography.body2Regular};
`;
