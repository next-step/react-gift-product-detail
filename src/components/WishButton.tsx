import { useState, useEffect } from "react"
import Wrapper from "./Wrapper"
import HeartFull from "@/assets/HeartFull.svg?react"
import HeartLine from "@/assets/HeartLine.svg?react"
import theme from "@/styles/theme"
import Text from "@/components/Text"
import { useProductWish } from "@/hooks/useProductWish"
import { WishResponse } from "@/interfaces/WishResponse"

interface Props {
  productId: string
}

const WishButton = ({ productId }: Props) => {
  const { wishData, wishLoading, toggleWish } = useProductWish(productId)

  const [optimisticWishData, setOptimisticWishData] = useState<
    WishResponse["data"] | null
  >(null)

  useEffect(() => {
    if (wishData) {
      setOptimisticWishData(wishData)
    }
  }, [wishData])

  if (wishLoading && !optimisticWishData) return null

  const displayData = optimisticWishData || wishData

  if (!displayData) return null

  const handleToggleWish = async () => {
    if (!displayData) return

    setOptimisticWishData({
      ...displayData,
      isWished: !displayData.isWished,
      wishCount: displayData.isWished
        ? displayData.wishCount - 1
        : displayData.wishCount + 1,
    })

    try {
      await toggleWish()
    } catch (error) {
      setOptimisticWishData(wishData || null)
      console.error("위시리스트 토글 실패:", error)
    }
  }

  return (
    <Wrapper onClick={handleToggleWish}>
      {displayData.isWished ? (
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
        {displayData.wishCount.toLocaleString()}
      </Text>
    </Wrapper>
  )
}

export default WishButton
