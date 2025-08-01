import Layout from "../Layout"
import { Product } from "@/interfaces/Product"
import BrandRow from "./BrandRow"
import BrandImg from "./BrandImg"
import Text from "../Text"

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
export default ProductBrandInfo
