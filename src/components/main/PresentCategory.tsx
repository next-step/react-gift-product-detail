import styled from "@emotion/styled";
import PresentTheme from "./PresentTheme";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useNavigate } from "react-router";
import { ROUTE_PATH } from "@/routes/paths";
import useThemes from "@/hooks/useThemes";

const PresentCategory = () => {
  const navigate = useNavigate();
  const { presentThemes, isPending, isError } = useThemes();

  if (isError) {
    return <></>;
  }

  const navigateToTheme = (themeId: number) => {
    navigate(`${ROUTE_PATH.THEMES.replace(":id", themeId.toString())}`);
  };

  return (
    <Background>
      <CategoryTitle>선물 테마</CategoryTitle>
      {presentThemes && !isPending ? (
        <ThemeGrid>
          {presentThemes.map(theme => (
            <button
              type="button"
              key={theme.themeId}
              onClick={() => navigateToTheme(theme.themeId)}
            >
              <PresentTheme theme={theme} />
            </button>
          ))}
        </ThemeGrid>
      ) : (
        <LoadingSpinner height="266px" />
      )}
    </Background>
  );
};

export default PresentCategory;

const Background = styled.div`
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.spacing.spacing2};
  background-color: ${({ theme }) => theme.colors.semantic.background.default};
`;

const CategoryTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.title1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.title1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.title1Bold.lineHeight};
  color: ${({ theme }) => theme.colors.semantic.text.default};
  margin: 0;
  padding: ${({ theme }) =>
    `${theme.spacing.spacing5} ${theme.spacing.spacing2}`};
`;

const ThemeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: ${({ theme }) => `${theme.spacing.spacing5} ${theme.spacing.spacing1}`};
  padding: ${({ theme }) => theme.spacing.spacing2};
`;
