import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function useThemeIdWithGuard(): number | null {
  const { themeId } = useParams<{ themeId?: string }>();
  const navigate = useNavigate();
  const parsedThemeId = Number(themeId);

  useEffect(() => {
    if (!themeId || isNaN(parsedThemeId) || parsedThemeId <= 0) {
      navigate("/notfound");
    }
  }, [themeId, parsedThemeId, navigate]);

  if (!themeId || isNaN(parsedThemeId) || parsedThemeId <= 0) {
    return null;
  }
  return parsedThemeId;
}
