import { requests } from '@/api/requests';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

interface ProductWishButtonProps {
  index: number;
}

const ProductWishButton = ({ index }: ProductWishButtonProps) => {
  const { data } = useQuery({
    queryKey: ['productWishData', index],
    queryFn: () => requests.fetchProductWish(index),
  });
  const [wished, setWished] = useState(data?.isWished);

  return (
    <button onClick={() => setWished(!wished)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#2a3038"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
      </svg>
      <p>{data?.wishCount}</p>
    </button>
  );
};

export default ProductWishButton;
