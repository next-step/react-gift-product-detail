import { useParams } from "react-router-dom"
import ThemeNotFound from "@/components/PresentTheme/ThemeNotFound"
import Loading from "@/components/PresentTheme/Loading"
import useThemeInfo from "@/hooks/useThemeInfo"
import ThemeHero from "@/components/ThemeHeader"
import ThemeProductSection from "@/components/ThemeProductSection"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { ROUTES } from "@/constants/routes"

const ThemeInfoPage = () => {
  const { themeId } = useParams<{ themeId: string }>()
  const navigate = useNavigate()
  const { theme, loading, error } = useThemeInfo(themeId || "")
  
  useEffect(() => {
    if (error) {
      if (error.response?.status === 404) {
        navigate(ROUTES.HOME, { replace: true })
      }
    }
  }, [error, navigate])

  if (!themeId) return <ThemeNotFound />
  if (loading) return <Loading />
  if (error) return <ThemeNotFound />
  return (
    <div>
      <ThemeHero {...theme} />
      <ThemeProductSection themeId={themeId} />
    </div>
  )
}
export default ThemeInfoPage
