import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchThemeInfo } from "@src/apis/BackEnd/apiList";
import HeroPanel from "@src/components/ThemePanels/HeroPanel";
import ToastContext from "@src/contexts/ToastContext";
import { useSuspenseQuery } from "@tanstack/react-query";
import ThemePanel from "./ThemePanel";

export type ThemeInfo = {
  backgroundColor: string;
  description: number;
  name: string;
  themeId: string;
  title: number;
};

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
