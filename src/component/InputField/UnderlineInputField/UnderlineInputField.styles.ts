import styled from '@emotion/styled'
import { theme } from '@/theme'

export const Input = styled.input<{ isError: boolean }>`
  width: 100%;
  height: ${theme.spacing[13]};
  margin-bottom: ${theme.spacing[3]};
  ${theme.typography.subtitle1Regular};
  border: none;
  outline: none;

  border-bottom: ${({ isError }) =>
    isError
      ? `1px solid ${theme.colors.semanticColor.stateColor.critical}`
      : `1px solid ${theme.colors.colorScale.gray[500]}`};
  transition: 0.2s ease border-color;

  &:focus {
    border-bottom: 1px solid ${theme.colors.colorScale.gray[800]};
  }
  &::placeholder {
    color: ${theme.colors.colorScale.gray[500]};
  }
`

export const ErrorMessage = styled.p<{ isActive: boolean }>`
  display: ${({ isActive }) => (isActive ? 'block' : 'none')};
  width: 100%;
  text-align: left;
  color: ${theme.colors.semanticColor.stateColor.critical};
  ${theme.typography.label2Regular};
  margin-top: -${theme.spacing[2]};
  margin-bottom: ${theme.spacing[3]};
`
