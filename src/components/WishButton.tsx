import Wrapper from "./Wrapper"
import HeartFull from "@/assets/HeartFull.svg?react"
import HeartLine from "@/assets/HeartLine.svg?react"
import theme from "@/styles/theme"
import Text from "@/components/Text"
import { useProductWish } from "@/hooks/useProductWish"

interface Props {
  productId: string
}

const WishButton = ({ productId }: Props) => {
  const { wishData, wishLoading, toggleWish } = useProductWish(productId)

  if (wishLoading && !wishData) return null

  if (!wishData) {
    return (
      <Wrapper>
        <HeartLine width={24} height={24} color={theme.colors.gray900} />
        <Text
          variant="body2Regular"
          margin="spacing0"
          padding="spacing0"
          color="gray900"
        >
          0
        </Text>
      </Wrapper>
    )
  }

  const handleToggleWish = () => {
    toggleWish()
  }

  return (
    <Wrapper onClick={handleToggleWish}>
      {wishData.isWished ? (
        <HeartFull width={24} height={24} color="#fa342c" />
      ) : (
        <HeartLine width={24} height={24} color={theme.colors.gray900} />
      )}

      <Text
        variant="body2Regular"
        margin="spacing0"
        padding="spacing0"
        color="gray900"
      >
        {wishData.wishCount.toLocaleString()}
      </Text>
    </Wrapper>
  )
}

export default WishButton
