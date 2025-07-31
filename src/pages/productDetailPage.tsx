import React, { Suspense } from 'react';
import ErrorBoundary from '@/pages/Home/components/ErrorBoundary';
const ProductDetailContent = React.lazy(() => import('@/components/ProductDetailContent'));

const Loading = () => <div style={{ padding: '2rem', textAlign: 'center' }}>로딩 중…</div>;

export default function ProductDetailPage() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <ProductDetailContent />
      </Suspense>
    </ErrorBoundary>
  );
}
