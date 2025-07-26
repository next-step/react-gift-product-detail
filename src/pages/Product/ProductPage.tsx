import Container from "@/components/common/Container";
import ProductInfo from "@/pages/Product/components/ProductInfo";
import ProductContent from "@/pages/Product/components/ProductContent";

const ProductPage = () => {
  return (
    <Container>
      <ProductInfo />
      <ProductContent />
    </Container>
  );
};

export default ProductPage;
