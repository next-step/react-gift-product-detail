import styled from '@emotion/styled'
import { theme } from '@/theme'
import HeartIcon from '@/assets/icons/heart.svg?react'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.colorScale.gray[0]};
  width: ${theme.spacing[13]};
  height: ${theme.spacing[12]};
  padding: ${theme.spacing[7]};
`

export const WishIcon = styled(HeartIcon)<{ isWished: boolean }>`
  width: ${theme.spacing[6]};
  height: ${theme.spacing[6]};
  margin-top: ${theme.spacing[1]};
  stroke: ${(props) =>
    props.isWished
      ? `${theme.colors.colorScale.red[700]}`
      : `${theme.colors.colorScale.gray[900]}`};
  fill: ${(props) =>
    props.isWished ? `${theme.colors.colorScale.red[700]}` : 'none'};
  stroke-width: 1.5;
`

export const CountText = styled.div`
  ${theme.typography.label2Regular};
  color: ${theme.colors.colorScale.gray[900]};
`
