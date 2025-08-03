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

export const TabBar = styled.div`
  display: flex;
  gap: ${spacing.spacing2};
  margin-top: ${spacing.spacing4};
  border-bottom: 1px solid ${colors.border.default};
`

export const TabButton = styled.button<{ active: boolean }>`
  background: none;
  border: none;
  padding: ${spacing.spacing3} ${spacing.spacing2};
  cursor: pointer;
  position: relative;
  color: ${(p) => (p.active ? colors.text.default : colors.text.sub)};
  font-weight: ${(p) => (p.active ? 600 : 400)};
  font-size: ${typography.body1Regular.fontSize};

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: ${spacing.spacing2};
    right: ${spacing.spacing2};
    height: 2px;
    background: ${(p) => (p.active ? colors.text.default : 'transparent')};
    border-radius: 2px;
  }
`

export const ContentArea = styled.div`
  margin-top: ${spacing.spacing4};
  line-height: 1.6;

  h2 {
    margin-top: 0;
  }

  p {
    margin: ${spacing.spacing2} 0;
  }

  ul {
    padding-left: ${spacing.spacing5};
    margin: ${spacing.spacing2} 0;
  }
`

export const ReviewCard = styled.div`
  background: ${colors.gray[100]};
  padding: ${spacing.spacing3};
  border-radius: 8px;
  margin-bottom: ${spacing.spacing3};
`

export const ReviewAuthor = styled.p`
  margin: 0;
  font-weight: 600;
`

export const ReviewContent = styled.p`
  margin: ${spacing.spacing1} 0 0;
`

export const EmptyText = styled.p`
  color: ${colors.text.sub};
`

export const StickyBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  padding: ${spacing.spacing2};
  background: ${colors.background.default};
  border-top: 1px solid ${colors.border.default};
  max-width: 800px;
  margin: 0 auto;
  align-items: center;
`

export const LikeSection = styled.div`
  flex: 0 0 auto;
  padding-right: ${spacing.spacing2};
`

export const LikeButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${spacing.spacing1};
  background: none;
  border: none;
  cursor: pointer;
`

export const LikeCount = styled.span`
  font-size: ${typography.label2Regular.fontSize};
  color: ${colors.text.default};
`
