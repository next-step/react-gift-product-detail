import styled from '@emotion/styled'
import { theme } from '@/theme'

export const ErrorText = styled.div`
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${theme.typography.body2Regular};
  color: ${theme.colors.semanticColor.stateColor.critical};
  text-align: center;
`
