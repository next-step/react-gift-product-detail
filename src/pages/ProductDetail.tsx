import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState, useCallback } from "react"
import { ROUTES } from "@/constants/routes"
import useProduct from "@/hooks/useProduct"
import ThemeNotFound from "@/components/PresentTheme/ThemeNotFound"
import Loading from "@/components/PresentTheme/Loading"
import ProductImage from "@/components/ProductImage"
import Text from "@/components/Text"
import Layout from "@/components/Layout"
import Blank from "@/components/Blank"
import theme from "@/styles/theme"
import Row from "@/components/Row"
import { useAuth } from "@/context/AuthContext"
import MoreButton from "@/components/MoreButton"
import getRoute from "@/functions/getRoute"
import TabButtonProduct from "@/components/TabButtonProduct"
import WishButton from "@/components/WishButton"
import ProductShortInfo from "@/components/ProductDetail/ProductShortInfo"
import ProductBrandInfo from "@/components/ProductDetail/ProductBrandInfo"
import ProductDescriptionTab from "@/components/ProductDetail/ProductDescriptionTab"
import ProductAnnouncementTab from "@/components/ProductDetail/ProductAnnouncementTab"
import ProductReviewTab from "@/components/ProductDetail/ProductReviewTab"

type Tab = "description" | "review" | "announcement"

const ProductDetail = () => {
  const { isLoggedIn } = useAuth()
  const { productId } = useParams<{ productId: string }>()
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>("description")

  const { product, loading, error } = useProduct(productId || "")

  useEffect(() => {
    if (error) {
      if (error.response?.status === 404) {
        navigate(ROUTES.HOME, { replace: true })
      }
    }
  }, [error, navigate])

  const handleGoOrder = useCallback(
    (id: number) => {
      if (!isLoggedIn) {
        navigate(ROUTES.LOGIN)
      } else {
        navigate(getRoute(ROUTES.ORDER, { id }))
      }
    },
    [isLoggedIn, navigate]
  )

  if (!productId) return <ThemeNotFound />
  if (loading) return <Loading />
  if (error) return <ThemeNotFound />
  if (!product) return null

  return (
    <>
      <Layout height="auto">
        <ProductImage src={product.imageURL} alt={product.name} />
      </Layout>

      <ProductShortInfo {...product} />
      <Blank height="1px" backGroundColor={theme.colors.gray300} />
      <ProductBrandInfo {...product} />
      <Blank height="8px" backGroundColor={theme.colors.gray300} />

      <Row padding="spacing0">
        <TabButtonProduct
          isActive={tab === "description"}
          onClick={() => setTab("description")}
        >
          상품설명
        </TabButtonProduct>
        <TabButtonProduct
          isActive={tab === "review"}
          onClick={() => setTab("review")}
        >
          선물후기
        </TabButtonProduct>
        <TabButtonProduct
          isActive={tab === "announcement"}
          onClick={() => setTab("announcement")}
        >
          상세정보
        </TabButtonProduct>
      </Row>

      {tab === "description" && <ProductDescriptionTab productId={productId} />}
      {tab === "announcement" && (
        <ProductAnnouncementTab productId={productId} />
      )}
      {tab === "review" && <ProductReviewTab productId={productId} />}

      <Row
        padding="spacing0"
        style={{
          width: "100%",
          maxWidth: "720px",
          left: "50%",
          transform: "translateX(-50%)",
          justifyContent: "center",
          position: "fixed",
          bottom: 0,
        }}
      >
        <WishButton productId={productId} />
        <MoreButton
          marginTop="spacing0"
          background="kakaoYellow"
          borderRadius="spacing0"
          style={{ flex: 1 }}
          onClick={() => handleGoOrder(Number(productId))}
        >
          <Text variant="subtitle1Bold" margin="spacing0" padding="spacing0">
            주문하기
          </Text>
        </MoreButton>
      </Row>
    </>
  )
}

export default ProductDetail
