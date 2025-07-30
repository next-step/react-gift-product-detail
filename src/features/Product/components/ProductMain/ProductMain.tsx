import * as S from './ProductMain.styles'
import type { ProductInfo } from '@/features/Product/hooks/useProductInfo'

interface ProductMainProps {
  product: ProductInfo
}

const ProductMain = ({ product }: ProductMainProps) => {
  return (
    <S.Container>
      <S.ProductImage src={product.imageURL} alt={product.name} />
      <S.ProductName>{product.name}</S.ProductName>
      <S.ProductPrice>
        {product.price.sellingPrice.toLocaleString()}원
      </S.ProductPrice>
      <S.Divider />
      <S.BrandInfo>
        <S.BrandImage
          src={product.brandInfo.imageURL}
          alt={product.brandInfo.name}
        />
        <S.BrandName>{product.brandInfo.name}</S.BrandName>
      </S.BrandInfo>
    </S.Container>
  )
}

export default ProductMain
