import { requests } from '@/api/requests';
import { useQuery } from '@tanstack/react-query';

interface ProductSectionProps {
  index: number;
}

const ProductSection = ({ index }: ProductSectionProps) => {
  const productQuery = useQuery({
    queryKey: ['productData', index],
    queryFn: () => requests.fetchProduct(index),
  });

  return (
    <section>
      <img src={productQuery.data?.imageURL} alt={productQuery.data?.name} />
      <h3>{productQuery.data?.name}</h3>
      <p>{productQuery.data?.price.basicPrice} 원</p>
      <div>
        <img src={productQuery.data?.brandInfo.imageURL} alt={productQuery.data?.brandInfo.name} />
        <p>{productQuery.data?.brandInfo.name}</p>
      </div>
    </section>
  );
};

export default ProductSection;
