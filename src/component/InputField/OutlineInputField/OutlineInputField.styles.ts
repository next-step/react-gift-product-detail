import styled from '@emotion/styled'
import { theme } from '@/theme'

export const InputContainer = styled.div`
  margin-bottom: ${theme.spacing[2]};
`

export const InputText = styled.input<{ isError: boolean }>`
  width: 100%;
  height: ${theme.spacing[10]};
  padding: ${theme.spacing[2]};
  border: 1px solid
    ${({ isError }) =>
      isError
        ? theme.colors.semanticColor.stateColor.critical
        : theme.colors.colorScale.gray[500]};
  border-radius: ${theme.spacing[1]};
`

export const ErrorText = styled.p`
  text-align: left;
  color: ${theme.colors.semanticColor.stateColor.critical};
  ${theme.typography.label2Regular};
  margin-top: ${theme.spacing[1]};
  margin-bottom: ${theme.spacing[2]};
`

export const InputLabel = styled.p`
  margin-bottom: ${theme.spacing[2]};
  ${theme.typography.label1Regular};
`
