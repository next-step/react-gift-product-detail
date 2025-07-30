import { useParams } from "react-router-dom"
import ThemeNotFound from "@/components/PresentTheme/ThemeNotFound"
import Loading from "@/components/PresentTheme/Loading"
import ProductImage from "@/components/ProductImage"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { ROUTES } from "@/constants/routes"
import useProduct from "@/hooks/useProduct"
import styled from "@emotion/styled"
import { Product } from "@/interfaces/Product"
import Text from "@/components/Text"
import Layout from "@/components/Layout"
import Blank from "@/components/Blank"
import theme from "@/styles/theme"
import Row from "@/components/Row"

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
          {price.basicPrice}원
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
const GetDetailButton = styled.button`
  width: 100%;
  padding: ${theme.space.spacing4} ${theme.space.spacing5};
  border: none;
  background-color: ${theme.colors.gray00};
`
const ProductDetailButton = () => {
  return (
    <Row padding="spacing0">
      <GetDetailButton type="button">
        <Text variant="title2Regular" margin="spacing0" padding="spacing0">
          상품설명
        </Text>
      </GetDetailButton>
      <GetDetailButton type="button">
        <Text variant="title2Regular" margin="spacing0" padding="spacing0">
          선물후기
        </Text>
      </GetDetailButton>
      <GetDetailButton type="button">
        <Text variant="title2Regular" margin="spacing0" padding="spacing0">
          상세정보
        </Text>
      </GetDetailButton>
    </Row>
  )
}
const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>()
  if (!productId) return <ThemeNotFound />
  const { product, loading, error } = useProduct(productId)
  console.log(product)
  const navigate = useNavigate()
  useEffect(() => {
    if (error) {
      if (error.response?.status === 404) {
        navigate(ROUTES.HOME, { replace: true })
      }
    }
  }, [error, navigate])

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
      <ProductDetailButton />
    </>
  )
}
export default ProductDetail
