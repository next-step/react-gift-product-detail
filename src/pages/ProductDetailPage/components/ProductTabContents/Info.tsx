import { ProductImage } from "../ProductHeader/ProductHeader.styles";
import type { ThemeProduct } from "@/types/ThemeProducts";

function Info({ product }: { product: ThemeProduct }) {
  // api 에 이미지 리소스가 없음, 기존 이미지로 대체

  return <ProductImage src={product.imageURL} />;
}

export default Info;
