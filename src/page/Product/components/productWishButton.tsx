import { useQuery } from '@tanstack/react-query';
import { requests } from '@/api/requests';
import { useWishToggleMutation } from '../hooks/useWishToggleMutation';

interface ProductWishButtonProps {
  index: number;
}

const ProductWishButton = ({ index }: ProductWishButtonProps) => {
  const { data } = useQuery({
    queryKey: ['productWishData', index],
    queryFn: () => requests.fetchProductWish(index),
  });

  const { mutate: toggleWish } = useWishToggleMutation(index);

  const handleWishClick = () => {
    toggleWish();
  };

  return (
    <button onClick={handleWishClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill={data?.isWished ? 'red' : 'none'}
        stroke={data?.isWished ? 'red' : '#2a3038'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
      </svg>
      <p>{data?.wishCount}</p>
    </button>
  );
};

export default ProductWishButton;
