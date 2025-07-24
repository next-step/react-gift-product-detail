import { useThemeIdWithGuard } from "./hooks/useThemeIDWithGuard";
import { useThemeInfo } from "./hooks/useThemeInfo";
import styled from "@emotion/styled";
import ThemeProductsList from "@/pages/themeproductspage/ThemeProductsList";

export default function ThemeProductsPage() {
  const themeId = useThemeIdWithGuard();
  const { data: themeInfo } = useThemeInfo(themeId);

  if (!themeId) return null;
  if (!themeInfo) {
    return <p>정보를 불러올 수 없습니다.</p>;
  }

  return (
    <div>
      <Banner style={{ backgroundColor: themeInfo.backgroundColor }}>
        <ThemeInfoName>{themeInfo.name}</ThemeInfoName>
        <ThemeInfoTitle>{themeInfo.title}</ThemeInfoTitle>
        <ThemeInfoDes>{themeInfo.description}</ThemeInfoDes>
      </Banner>
      <section>
        <ThemeProductsList />
      </section>
    </div>
  );
}

const Banner = styled.div`
  padding: 24px;
`;

const ThemeInfoName = styled.div`
  font-size: ${({ theme }) => theme.typography.body2Regular.fontSize};
  margin-bottom: 14px;
  color: white;
`;

const ThemeInfoTitle = styled.div`
  font-size: ${({ theme }) => theme.typography.title1Regular.fontSize};
  font-weight: bold;
  margin-bottom: 8px;
  color: white;
`;

const ThemeInfoDes = styled.div`
  font-size: ${({ theme }) => theme.typography.subtitle1Regular.fontSize};
  margin-bottom: 4px;
  color: white;
`;
