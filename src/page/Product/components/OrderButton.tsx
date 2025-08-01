import { ROUTE_PATH } from '@/routes/routePath';
import { generatePath, useNavigate } from 'react-router-dom';

interface OrderButtonProps {
  index: number;
}

const OrderButton = ({ index }: OrderButtonProps) => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(generatePath(ROUTE_PATH.ORDER, { id: String(index) }))}>
      <p>주문하기</p>
    </button>
  );
};

export default OrderButton;
