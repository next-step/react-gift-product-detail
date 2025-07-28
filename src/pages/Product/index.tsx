import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { ErrorBoundary, Loading, RedirectOnError } from '@/shared/ui';
import { ROUTES } from '@/shared/config';
import { getProductById } from '@/entities/product/api/productApi';
import { useSuspenseQuery } from '@tanstack/react-query';
import type { RankingProduct } from '@/entities/product/model/types';
import { ProductOverview, ProductTabs } from '@/entities/product/ui';

// TODO: 상품 상세 페이지 구현
// 1. getProductById : 최상단 꽉, [이미지,이름,가격, devider, 브랜드사진과 이름] (done)
// 2. 필터링 - 쿼리 파람 아님 (done)    
// 3. /api/products/:productId/detail {description} : 상품설명 (done)
// 4. /api/products/:productId/highlight-review : 선물후기
// 5. /api/products/:productId/detail {announcements} : 상세정보 (done)
// 6. /api/products/:productId/wish : 찜하기(낙관적 업데이트 처리), 주문하기 버튼 디자인

const Product = () => {
    const { productId } = useParams<{ productId: string }>();
    const numericProductId = productId ? parseInt(productId, 10) : undefined;
    // const navigate = useNavigate();

    if (!numericProductId) {
        return null;
    }

    const { data } = useSuspenseQuery<RankingProduct>({
        queryKey: ['product', numericProductId],
        queryFn: () => getProductById(numericProductId),
    });

    return (
        <ErrorBoundary fallback={<RedirectOnError to={`/${ROUTES.HOME}`} />}>
            <Suspense fallback={<Loading height="100vh" />}>
                <ProductOverview data={data} />
                <ProductTabs />
                {/* <button onClick={() => navigate(`/${ROUTES.ORDER}/${numericProductId}`)}>Order</button> */}
            </Suspense>
        </ErrorBoundary>
    );
}

export default Product;