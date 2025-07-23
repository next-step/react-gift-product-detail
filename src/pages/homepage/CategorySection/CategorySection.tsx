/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import CategoryItem from "@/pages/homepage/CategorySection/CategoryItem";
import { useApiRequest } from "@/hooks/useApiRequest";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { API_ENDPOINTS } from "@/utils/API_ENDPOINTS";
import type { Theme } from "@/types/api_types";

export default function CategorySection() {
  const query = useApiRequest<Theme[]>({
    url: API_ENDPOINTS.THEMES,
    method: "get",
  }) as import("@tanstack/react-query").UseQueryResult<Theme[], Error>;
  const navigate = useNavigate();

  if (query.isLoading) return <LoadingSpinner />;
  if (query.isError || !query.data || query.data.length === 0) return null;

  const handleClick = (themeId: number) => {
    navigate(`/themes/${themeId}`);
  };

  return (
    <>
      <SectionTitle>선물 테마</SectionTitle>
      <Container>
        {query.data?.map((theme: Theme) => (
          <div
            key={theme.themeId}
            onClick={() => handleClick(theme.themeId)}
            style={{ cursor: "pointer" }}
          >
            <CategoryItem name={theme.name} image={theme.image} />
          </div>
        ))}
      </Container>
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px 8px;
  padding: 16px 0;
`;

const SectionTitle = styled.div`
  font-size: ${({ theme }) => theme.typography.title1Regular.fontSize};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textDefault};
  padding: 16px 16px;
`;
