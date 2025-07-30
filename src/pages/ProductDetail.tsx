import { useParams } from "react-router-dom"
import ThemeNotFound from "@/components/PresentTheme/ThemeNotFound"
import Loading from "@/components/PresentTheme/Loading"
import ProductImage from "@/components/ProductImage"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { ROUTES } from "@/constants/routes"
import useProduct from "@/hooks/useProduct"
import styled from "@emotion/styled"
import { Product } from "@/interfaces/Product"
import Text from "@/components/Text"
import Layout from "@/components/Layout"
import Blank from "@/components/Blank"
import theme from "@/styles/theme"
import Row from "@/components/Row"
import { useAuth } from "@/context/AuthContext"
import MoreButton from "@/components/MoreButton"
import { useCallback } from "react"
import getRoute from "@/functions/getRoute"
import useProductDetail from "@/hooks/useProductDetail"
import { useProductReviews } from "@/hooks/useProductReviews"
import TabButtonProduct from "@/components/TabButtonProduct"
import WishButton from "@/components/WishButton"
import ErrorBoundary from "@/components/ErrorBoundary"
import { Suspense } from "react"

const TAB_LIST = ["description", "review", "announcement"] as const
type Tab = (typeof TAB_LIST)[number]

const BrandRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.space.spacing2};
`

const ProductShortInfoStyle = styled.div`
  width: 100%;
`
const ProductShortInfo = ({ name, price }: Product) => {
  return (
    <Layout
      paddingLeft="spacing4"
      paddingRight="spacing4"
      height="auto"
      marginBottom="spacing4"
    >
      <ProductShortInfoStyle>
        <Text
          variant="title1Bold"
          margin="spacing0"
          padding="spacing0"
          marginTop="spacing5"
        >
          {name}
        </Text>
        <Text
          variant="title1Bold"
          margin="spacing0"
          padding="spacing0"
          marginTop="spacing2"
        >
          {price.sellingPrice}원
        </Text>
      </ProductShortInfoStyle>
    </Layout>
  )
}
const BrandImg = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: ${theme.space.spacing4};
`
const ProductBrandInfo = ({ brandInfo }: Product) => {
  return (
    <Layout
      paddingLeft="spacing4"
      paddingRight="spacing4"
      paddingUp="spacing4"
      paddingDown="spacing4"
      height="auto"
    >
      <BrandRow>
        <BrandImg src={brandInfo.imageURL} alt={brandInfo.name} />
        <Text variant="title2Regular" margin="spacing0" padding="spacing0">
          {brandInfo.name}
        </Text>
      </BrandRow>
    </Layout>
  )
}

const ProductDescription = styled.div`
  background-color: ${theme.colors.gray00};
  img {
    background-color: ${theme.colors.gray00};
    max-width: 100%;
    height: auto;
    display: block;
  }
  p {
    background-color: ${theme.colors.gray00};
    margin: 16px;
  }
  [class*="__cu_imgsize"] {
    background-color: ${theme.colors.gray00};
    max-width: 100%;
    height: auto;
    display: block;
  }
`
const ProductDetail = () => {
  const { isLoggedIn } = useAuth()
  const { productId } = useParams<{ productId: string }>()
  if (!productId) return <ThemeNotFound />
  const { product, loading, error } = useProduct(productId)
  console.log(product)

  const [tab, setTab] = useState<Tab>("description")
  const {
    data: detailData,
    isLoading: detailLoading,
    error: detailError,
  } = useProductDetail(
    productId,
    tab === "description" || tab === "announcement"
  )
  const {
    data: reviewData,
    isLoading: reviewLoading,
    error: reviewError,
    refetch: refetchReviews,
  } = useProductReviews(productId, tab === "review")
  const handleTab = (t: Tab) => {
    setTab(t)

    if (t === "review") refetchReviews()
  }

  const navigate = useNavigate()
  console.log(detailData?.announcements)
  console.log(detailData?.description)

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
  if (loading) return <Loading />
  if (error) return <ThemeNotFound />
  if (!product) return null
  return (
    <>
      <Layout height="auto">
        <ProductImage src={product?.imageURL} alt={product?.name} />
      </Layout>

      <ProductShortInfo {...product} />
      <Blank height="1px" backGroundColor={theme.colors.gray300}></Blank>
      <ProductBrandInfo {...product} />
      <Blank height="8px" backGroundColor={theme.colors.gray300}></Blank>
      <Row padding="spacing0">
        <TabButtonProduct
          isActive={tab === "description"}
          onClick={() => handleTab("description")}
        >
          상품설명
        </TabButtonProduct>

        <TabButtonProduct
          isActive={tab === "review"}
          onClick={() => handleTab("review")}
        >
          선물후기
        </TabButtonProduct>

        <TabButtonProduct
          isActive={tab === "announcement"}
          onClick={() => handleTab("announcement")}
        >
          상세정보
        </TabButtonProduct>
      </Row>
      {tab === "description" && (
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            {(() => {
              if (detailError) throw detailError

              if (detailLoading) return <Loading />

              return (
                <Layout
                  height="auto"
                  paddingDown="spacing16"
                  paddingUp="spacing4"
                >
                  <ProductDescription
                    dangerouslySetInnerHTML={{
                      __html: detailData?.description ?? "",
                    }}
                  />
                </Layout>
              )
            })()}
          </Suspense>
        </ErrorBoundary>
      )}

      {tab === "announcement" && (
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            {(() => {
              if (detailError) throw detailError

              if (detailLoading) return <Loading />

              return (
                <Layout
                  paddingLeft="spacing4"
                  paddingRight="spacing4"
                  height="auto"
                  paddingDown="spacing16"
                >
                  {detailData?.announcements.map((a) => (
                    <div key={a.displayOrder} style={{ marginBottom: "16px" }}>
                      <Text
                        variant="body2Bold"
                        margin="spacing0"
                        padding="spacing0"
                      >
                        {a.name}
                      </Text>
                      <Text
                        variant="body2Regular"
                        margin="spacing0"
                        padding="spacing0"
                      >
                        {a.value}
                      </Text>
                    </div>
                  ))}
                </Layout>
              )
            })()}
          </Suspense>
        </ErrorBoundary>
      )}

      {tab === "review" && (
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            {(() => {
              if (reviewError) throw reviewError

              if (reviewLoading) return <Loading />

              return (
                <Layout
                  height="auto"
                  marginBottom="spacing0"
                  paddingLeft="spacing4"
                  paddingRight="spacing4"
                  paddingDown="spacing16"
                >
                  {reviewData?.reviews.map((r) => (
                    <div key={r.id} style={{ marginBottom: "16px" }}>
                      <Text
                        variant="subtitle2Bold"
                        margin="spacing0"
                        padding="spacing0"
                      >
                        {r.authorName}
                      </Text>
                      <Text
                        variant="body1Regular"
                        margin="spacing0"
                        padding="spacing0"
                      >
                        {r.content}
                      </Text>
                    </div>
                  ))}
                </Layout>
              )
            })()}
          </Suspense>
        </ErrorBoundary>
      )}

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
