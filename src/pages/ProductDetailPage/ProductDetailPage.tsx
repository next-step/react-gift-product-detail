import Layout from "@/layout";
import { useParams } from "react-router-dom";

function ProductDetailPage() {
  const { id } = useParams();

  return (
    <Layout>
      <div>ProductDetailPage: {id}</div>
    </Layout>
  );
}

export default ProductDetailPage;
