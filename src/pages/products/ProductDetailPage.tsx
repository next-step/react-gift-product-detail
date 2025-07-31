import { ProductDescriptionTab } from "@/features/product/container/ProductDescriptionTab";
import { ProductFooter } from "@/features/product/container/ProductFooter";
import { ProductHero } from "@/features/product/container/ProductHero";
import { ProductInfoTab } from "@/features/product/container/ProductInfoTab";
import { ProductReviewTab } from "@/features/product/container/ProductReviewTab";
import { ProductTabProvider } from "@/features/product/contexts/ProductTabContext";

import { ProductTab, ProductTabContent } from "@/pages/products/ProductTab";

import { HTTPBoundary } from "@/shared/helpers/HTTPBoundary";
import { Spinner } from "@/shared/ui/Spinner.styled";

import { VerticalSpacing } from "@/widgets/layouts/Spacing.styled";

export default function ProductDetailPage() {
    return (
        <ProductTabProvider>
            <HTTPBoundary
                onPending={<Spinner />}
                onError={(code) => {
                    switch (code) {
                        case 404:
                            return <div>해당 상품이 존재하지 않습니다</div>;
                        default:
                            return <div>알 수 없는 오류가 발생했습니다.</div>;
                    }
                }}
            >
                <ProductHero />

                <VerticalSpacing size="8px" backgroundColor="#f3f4f5" />

                <ProductTab />

                <ProductTabContent productTab="상품설명">
                    <ProductInfoTab />
                </ProductTabContent>
                <ProductTabContent productTab="선물후기">
                    <ProductReviewTab />
                </ProductTabContent>
                <ProductTabContent productTab="상세정보">
                    <ProductDescriptionTab />
                </ProductTabContent>

                <ProductFooter />
            </HTTPBoundary>
        </ProductTabProvider>
    );
}
