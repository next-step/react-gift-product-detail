import { Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ErrorBoundary, Loading, RedirectOnError } from '@/shared/ui';
import { ROUTES } from '@/shared/config';

const Product = () => {
    const { productId } = useParams<{ productId: string }>();
    const numericProductId = productId ? parseInt(productId, 10) : undefined;
    const navigate = useNavigate();

    if (!numericProductId) {
        return null;
    }

    return (
        <ErrorBoundary fallback={<RedirectOnError to={`/${ROUTES.HOME}`} />}>
            <Suspense fallback={<Loading height="100vh" />}>
                <div>Product</div>
                <button onClick={() => navigate(`/${ROUTES.ORDER}/${numericProductId}`)}>Order</button>
            </Suspense>
        </ErrorBoundary>
    );
}

export default Product;