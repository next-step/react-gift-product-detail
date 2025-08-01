import ProductShortInfoStyle from "@/components/ProductDetail/ProductShortInfoStyle"
import { Product } from "@/interfaces/Product"
import Layout from "../Layout"
import Text from "../Text"

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
export default ProductShortInfo
