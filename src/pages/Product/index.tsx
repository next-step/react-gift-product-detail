import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { ErrorBoundary, Loading, RedirectOnError } from '@/shared/ui';
import { ROUTES } from '@/shared/config';
import { getProductById } from '@/entities/product/api/productApi';
import { useSuspenseQuery } from '@tanstack/react-query';
import { productQueryKeys } from '@/entities/product/api/queryKeys';
import type { RankingProduct } from '@/entities/product/model/types';
import { ProductOverview, ProductTabs } from '@/entities/product/ui';
import { ProductActionGroup } from '@/entities/product/ui/ProductActionGroup';

const Product = () => {
    const { productId } = useParams<{ productId: string }>();
    const numericProductId = productId ? parseInt(productId, 10) : undefined;

    if (!numericProductId) {
        return null;
    }

    const { data } = useSuspenseQuery<RankingProduct>({
        queryKey: productQueryKeys.info(numericProductId),
        queryFn: () => getProductById(numericProductId),
    });

    return (
        <ErrorBoundary fallback={<RedirectOnError to={`/${ROUTES.HOME}`} />}>
            <Suspense fallback={<Loading height="100vh" />}>
                <ProductOverview data={data} />
                <ProductTabs />
                <Suspense fallback={<Loading height="60px" />}>
                    <ProductActionGroup />
                </Suspense>
            </Suspense>
        </ErrorBoundary>
    );
}

export default Product;