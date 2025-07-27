import { useThemeInfo } from "@/hooks/useThemeInfo";
import { ThemeHero } from "@/pages/themes/components/ThemeHero";

type Props = {
  themeId: number;
};

export const ThemeHeroSection = ({ themeId }: Props) => {
  const { themeInfo } = useThemeInfo(themeId);

  return <ThemeHero info={themeInfo} />;
};
