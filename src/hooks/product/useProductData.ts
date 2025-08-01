import { useParams } from 'react-router-dom';
import { getProductBasicInfo, getProductDetailInfo, getProductHighlightReview, getProductWishInfo } from '@/apis/product';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { LoginInfoContext } from '@/contexts/LoginInfoContext';

// 조합된 데이터 타입
interface CombinedProductData {
  basicInfo: {
    id: number;
    name: string;
    imageURL: string;
    price: {
      basicPrice: number;
      discountRate: number;
      sellingPrice: number;
    };
    brandInfo: {
      id: number;
      name: string;
      imageURL: string;
    };
  };
  detailInfo: {
    description: string;
    announcements: Array<{
      name: string;
      value: string;
      displayOrder: number;
    }>;
  };
  reviewInfo: {
    totalCount: number;
    reviews: Array<{
      id: string;
      authorName: string;
      content: string;
    }>;
  };
  wishInfo: {
    wishCount: number;
    isWished: boolean;
  };
}

function useProductData() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useContext(LoginInfoContext);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [isWished, setIsWished] = useState<boolean>(false);

  const { data: productData, isLoading } = useQuery<CombinedProductData>({
    queryKey: ['productData', productId],
    queryFn: async () => {
      // 여러 API를 병렬로 호출
      const [basicInfo, detailInfo, reviewInfo, wishInfo] = await Promise.all([
        getProductBasicInfo(Number(productId)),
        getProductDetailInfo(Number(productId)),
        getProductHighlightReview(Number(productId)),
        getProductWishInfo(Number(productId)),
      ]);

      return {
        basicInfo,
        detailInfo,
        reviewInfo,
        wishInfo,
      };
    },
  });

  useEffect(() => {
    if (productData?.wishInfo) {
      setLikeCount(productData.wishInfo.wishCount);
      setIsWished(productData.wishInfo.isWished);
    }
  }, [productData?.wishInfo]);

  function handleLikeClick() {
    if (isWished) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }
    setIsWished((prev) => !prev);
  }

  function handleOrderClick() {
    return navigate(`/order/${productId}`);
  }

  function handleItemClick(itemId: number) {
    if (userInfo.email === '') {
      navigate('/login');
    } else {
      navigate(`/product/${itemId}`);
    }
  }

  return {
    productData,
    isLoading,
    likeCount,
    isWished,
    handleLikeClick,
    handleOrderClick,
    handleItemClick,
  };
}

export default useProductData; 