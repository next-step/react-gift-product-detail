import styled from '@emotion/styled'
import { theme } from '@/theme'

export const Container = styled.div`
  padding: ${theme.spacing[1]} ${theme.spacing[4]};
  margin: ${theme.spacing[3]} 0px;
  background: ${theme.colors.semanticColor.backgroundColor.default};
`

export const Title = styled.p`
  ${theme.typography.title1Bold};
  line-height: ${theme.spacing[2]};
  margin-bottom: ${theme.spacing[5]};
`

export const SubText = styled.div`
  ${theme.typography.label2Regular};
  color: ${theme.colors.colorScale.gray[600]};
  margin-bottom: ${theme.spacing[3]};
`
