import { useNavigate, useParams } from 'react-router-dom';

const FixedBottonBar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleOrder = () => navigate(`/order/${id}`);

  return (
    <div>
      <button>하트</button>
      <button onClick={handleOrder}>주문하기</button>
    </div>
  );
};

export default FixedBottonBar;
