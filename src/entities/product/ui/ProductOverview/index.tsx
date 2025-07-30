import * as S from './styles';
import type { RankingProduct } from '@/entities/product/model/types';

const ProductOverview = ({ data }: { data: RankingProduct }) => {
    return (
        <S.ProductContainer>
            <S.ProductImage src={data.imageURL} alt={data.name} />
            <S.ProductName>{data.name}</S.ProductName>
            <S.ProductPrice>{data.price.sellingPrice}<span>원</span></S.ProductPrice>
            <S.Divider />
            <S.BrandContainer>
                <S.BrandImage src={data.brandInfo.imageURL} alt={data.brandInfo.name} />
                <S.BrandName>{data.brandInfo.name}</S.BrandName>
            </S.BrandContainer>
        </S.ProductContainer>
    );
}

export default ProductOverview;

