import { requests } from '@/api/requests';
import { ROUTE_PATH } from '@/routes/routePath';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface ProductSummaryData {
  id: number;
  name: string;
  brandName: string;
  price: number;
  imageURL: string;
}

const useRanking = (id: string) => {
  const navigate = useNavigate();
  const [productSummaryData, setProductSummaryData] = useState<ProductSummaryData>();

  useEffect(() => {
    const dataFetch = async () => {
      try {
        const data = await requests.fetchSummary(id);
        setProductSummaryData(data);
      } catch {
        navigate(ROUTE_PATH.HOME);
        return;
      }
    };
    dataFetch();
  }, [id]);

  return { productSummaryData };
};
export default useRanking;
