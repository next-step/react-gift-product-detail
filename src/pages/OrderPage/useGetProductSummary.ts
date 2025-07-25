import { useParams } from 'react-router-dom';
import { useSuspenseQueryApi } from '@/apis/useQueryApi';

interface ProductSummary {
  id: number;
  name: string;
  brandName: string;
  price: number;
  imageURL: string;
}

const useGetProductSummary = () => {
  const { productId } = useParams<{ productId: string }>();
  const { data } = useSuspenseQueryApi<{ data: ProductSummary }>(
    ['product', 'summary', productId || ''],
    productId ? `/products/${productId}/summary` : '',
    { enabled: !!productId }
  );

  const product = data.data;
  return { product };
};

export default useGetProductSummary;
