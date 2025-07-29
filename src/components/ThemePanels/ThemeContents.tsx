import { useParams } from "react-router-dom";
import { fetchThemeInfo } from "@src/apis/BackEnd/apiList";
import HeroPanel from "@src/components/ThemePanels/HeroPanel";
import { useSuspenseQuery } from "@tanstack/react-query";
import ThemePanel from "./ThemePanel";
import type { ThemeInfo } from "@src/types/ThemeTypes";

function ThemeContents() {
  const themeId = useParams().id ?? "";
  const themeInfo = useSuspenseQuery<ThemeInfo>({
    queryKey: ["themeInfo", themeId],
    queryFn: () => fetchThemeInfo(themeId)
  });

  return (
    <>
      <HeroPanel themeInfo={themeInfo.data!} />
      <ThemePanel />
    </>
  );
}

export default ThemeContents;
