import styled from "@emotion/styled";
import { fetchThemes } from "@src/apis/BackEnd/apiList";
import ThemeButton from "@src/components/shared/ThemeButton";
import { useSuspenseQuery } from "@tanstack/react-query";

type Theme = {
  themeId: number;
  name: string;
  image: string;
};

function GiftThemePanel() {
  const themes = useSuspenseQuery({
    queryKey: ["themes"],
    queryFn: fetchThemes
  });

  return (
    <GiftThemePanelWrapper>
      <TitleP>선물 테마</TitleP>
      <ThemePlaceholder>
        {themes.data?.map((theme: Theme) => {
          return (
            <ThemeButton
              key={theme.themeId}
              id={theme.themeId}
              image={theme.image}
              caption={theme.name}
            />
          );
        })}
      </ThemePlaceholder>
    </GiftThemePanelWrapper>
  );
}

const TitleP = styled.p`
  width: 95%;
  font-size: 20px;
  font-weight: bold;
`;

const ThemePlaceholder = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  row-gap: 16px;
  justify-items: center;
  align-items: start;
  width: 100%;
`;

const GiftThemePanelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: white;

  animation: fadeSlideIn 0.4s ease-out;

  @keyframes fadeSlideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export default GiftThemePanel;
