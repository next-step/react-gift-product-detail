import { DefaultDiv } from "@/styles/Common.styled"
import BottomBar from "@/component/product/BottomBar";
import ProductThumbNail from "@/component/product/ProductThumbNail";
import ProductDetail from "@/component/product/ProductDetail";

const Product = () => {


    return (
        <DefaultDiv>
            <ProductThumbNail/>
            <ProductDetail/>
            <BottomBar/>
        </DefaultDiv>
    )
}

export default Product