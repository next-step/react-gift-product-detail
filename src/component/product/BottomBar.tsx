import { BottomBarDiv, LikeButton, OrderButton, OrderButtonText } from './BottomBar.styled'
import { likeImage } from '@/assets/imgUrl'
import useLike from '@/hook/product/useLike'
import theme from '@/styles/theme';

const BottomBar = () => {
    const {wishCount, isWished, handleClick} = useLike();

    const wishColor = isWished ?  theme.colors.red700 : theme.colors.text_default;
    const fill = isWished ?  theme.colors.red700 : "none"

    return (
        <BottomBarDiv>
            <LikeButton onClick={handleClick}>
                <svg
                    xmlns={likeImage}
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill={fill}
                    stroke={wishColor}
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    >
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </svg>
                <p style= {{fontSize : '0.625rem'}}>{wishCount}</p>
            </LikeButton>
            <OrderButton>
                <OrderButtonText>주문하기</OrderButtonText>
            </OrderButton>
        </BottomBarDiv>
    )
}

export default BottomBar
