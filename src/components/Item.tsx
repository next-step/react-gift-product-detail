import type { mockItemType } from '@/mocks/mockItem';
import {
  ItemContainerStyle,
  ItemImageWrapper,
  ItemBrand,
  ItemImg,
  ItemIndex,
  ItemName,
  ItemPrice,
} from '@/styles/Item/Item.styles';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { LoginInfoContext } from '@/contexts/LoginInfoContext';

type ItemProps = {
  index: number;
  itemData: mockItemType;
};

function Item({ index, itemData }: ItemProps) {
  const navigate = useNavigate();
  const { userInfo } = useContext(LoginInfoContext);

  const handleItemClick = (itemId: number) => {
    if (userInfo.email === '') {
      navigate('/login');
    } else {
      navigate(`/product/${itemId}`);
    }
  };

  return (
    <ItemContainerStyle onClick={() => handleItemClick(itemData.id)}>
      <ItemImageWrapper>
        <ItemImg src={itemData.imageURL} alt={itemData.name} />
        <ItemIndex index={index}>{index + 1}</ItemIndex>
      </ItemImageWrapper>
      <ItemBrand>{itemData.brandInfo.name}</ItemBrand>
      <ItemName>{itemData.name}</ItemName>
      <ItemPrice>{itemData.price.basicPrice}원</ItemPrice>
    </ItemContainerStyle>
  );
}

export default Item;
