import styled from '@emotion/styled'
import { spacing } from '@/theme/spacing'
import { colors } from '@/theme/color'
import { typography } from '@/theme/typography'
import { YellowButton } from '@/components/common'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.spacing6};
  padding: ${spacing.spacing6} 0;
  color: ${colors.text.default};
`

export const ProductImage = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 4px;
`

export const Name = styled.h3`
  font-size: ${typography.subtitle1Bold.fontSize};
  font-weight: ${typography.subtitle1Bold.fontWeight};
  margin: 0;
`

export const Brand = styled.p`
  color: ${colors.text.sub};
  font-size: ${typography.label2Regular.fontSize};
  margin: 0;
`

export const Price = styled.p`
  font-size: ${typography.body1Bold.fontSize};
  font-weight: ${typography.body1Bold.fontWeight};
  margin: 0;
`

export const WishButton = styled.button`
  background: none;
  border: 0;
  display: flex;
  align-items: center;
  gap: ${spacing.spacing1};
  cursor: pointer;
`

export const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${spacing.spacing2};
`

export const InfoItem = styled.li`
  white-space: pre-wrap;
`
export const Description = styled.p`
  ${typography.body2Regular};
`

export const ReviewList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${spacing.spacing2};
`

export const ReviewItem = styled.li`
  ${typography.body2Regular};
  white-space: pre-wrap;
`

export const OrderButton = styled(YellowButton)`
  padding: ${spacing.spacing3};
  font-size: ${typography.subtitle1Bold.fontSize};
  font-weight: ${typography.subtitle1Bold.fontWeight};
`