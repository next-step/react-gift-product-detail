import MyButton from '@/component/Button/Button'
import WishButton from '@/features/Product/components/WishButton/WishButton.tsx'
import * as S from './BottomBar.styles.ts'

interface BottomBarProps {
  productId: number
  handleOrder: () => void
}

const BottomBar = ({ productId, handleOrder }: BottomBarProps) => {
  return (
    <S.Footer>
      <WishButton productId={productId} />
      <MyButton onClick={handleOrder} variant="primary" fullWidth={true}>
        <S.OrderText>주문하기</S.OrderText>
      </MyButton>
    </S.Footer>
  )
}

export default BottomBar
