import { DefaultDiv } from "@/styles/Common.styled"
import BottomBar from "@/component/product/BottomBar";
import ProductThumbNail from "@/component/product/ProductThumbnail ";
import ProductDetail from "@/component/product/ProductDetail";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import Loading from "@/component/Loading";

const Product = () => {

    return (
        <DefaultDiv>
            <ErrorBoundary fallback={null}>
                
                <Suspense fallback={<Loading />}>
                    <ProductThumbNail />
                    <ProductDetail />
                    <BottomBar />
                </Suspense>
            </ErrorBoundary>
            
        </DefaultDiv>
    )
}

export default Product